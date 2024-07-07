import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import { default as _ReactPlayer } from "react-player/lazy";
import { ReactPlayerProps } from "react-player/types/lib";
import CircularProgress from "@mui/material/CircularProgress";
import "./dashboard.css";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import io, { Socket } from "socket.io-client";
import TeamActivity from "./components/teamActivity";
import { Box, Container, Grid, Grow, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PeopleIcon from "@mui/icons-material/People";
import AppsIcon from "@mui/icons-material/Apps";
import FrameSlider from "./components/frameSlider";
import PresenceMaps from "./components/presenceMaps";
import Soccerfield from "./components/soccerfield";
import DensityPlot from "./components/kdePlot";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers/combinedReducers";
import { tacticalAnalysisSlice } from "../../reducers/tacticalAnalysis";
import TimelineIcon from "@mui/icons-material/Timeline";
import IndividualTracking from "./components/individualPlayers";
import TeamDetails from "./components/teamDetails";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import PassingNetwork from "./components/passingNetwork";
import SaveAnalysisPopup from "./components/saveAnalysis";

const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Dashboard() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [frames,setFrames] = useState<string[]>([]);
  
  const length = useSelector(
    (state: RootState) => state.tacticalAnalysis.info.length
  );
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.tacticalAnalysis.loading
  );
  const info = useSelector((state: RootState) => state.tacticalAnalysis.info);
  const slider = useSelector(
    (state: RootState) => state.tacticalAnalysis.slider
  );
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoDetails, setVideoDetails] = useState({
    fileName: "",
    fileSize: "",
  });
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const cancelSourceRef = useRef<CancelTokenSource | null>(null);
  const [view, setView] = useState<{ [key: string]: boolean }>({
    kde_plots: false,
    formations: false,
    presence_maps: false,
    individual: false,
    passings: false,
  });

  const setViewHandler = (functionName: string) => {
    setView({
      ...view,
      [functionName]: !view[functionName],
    });
  };
  const subPlots = [
    {
      id: 1,
      title: "KDE Plots",
      icon: <LocalFireDepartmentIcon />,
      function: "kde_plots",
    },
    {
      id: 2,
      title: "Formations",
      icon: <TimelineIcon />,
      function: "formations",
    },
    {
      id: 3,
      title: "Presence Maps",
      icon: <AppsIcon />,
      function: "presence_maps",
    },
    {
      id: 4,
      title: "Individual",
      icon: <PeopleIcon />,
      function: "individual",
    },
    {
      id: 5,
      title: "Passings",
      icon: <SportsSoccerIcon />,
      function: "passings",
    }
  ];

  useEffect(() => {
    if (socket) {
      socket.on("final_message_from_server", (data) => {
        socket.disconnect();
        setSocket(null);
      });
      socket.on("message_from_server", (data) => {
        if(data.ball.length !== 0){
          dispatch(tacticalAnalysisSlice.actions.setPosessions(data.ball));
        }
        if (loading) {
          dispatch(tacticalAnalysisSlice.actions.setLoading(false));
        }
        for (let i = 0; i < data.info.length; i++) {
          data.info[i].coordinates = [
            (data.info[i].coordinates[0] / 1680) * 100,
            (data.info[i].coordinates[1] / 1080) * 100,
          ];
        }
        setFrames((prevFrames) => [...prevFrames, `data:image/jpeg;base64, ${data.frame}`]);


        dispatch(
          tacticalAnalysisSlice.actions.addFrames({
            info: data.info,
          })
        );
        
        if (length === 1) {
          dispatch(tacticalAnalysisSlice.actions.setSlider(1));
        }
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  useEffect(() => {
    dispatch(tacticalAnalysisSlice.actions.reset());
    setFrames([]);
    setUploadProgress(0);
    setView({
      kde_plots: false,
      formations: false,
      presence_maps: false,
      individual: false,
      passings: false,
    });
  }, [videoSrc]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "video/mp4") {
        if (videoSrc) {
          URL.revokeObjectURL(videoSrc);
        }
        const videoUrl = URL.createObjectURL(file);
        setVideoDetails({
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2),
        });
        cancelSourceRef.current = axios.CancelToken.source();
        setVideoSrc(videoUrl);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "TACTICAL");

        try {
          dispatch(tacticalAnalysisSlice.actions.reset());
          const response: AxiosResponse = await axios.post(
            "http://localhost:5000/api/upload",
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                  (progressEvent.loaded / progressEvent.total!) * 100
                );
                setUploadProgress(progress);
              },
              cancelToken: cancelSourceRef.current.token,
            }
          );

          if (response.status === 200) {
            console.log("File uploaded successfully");
            dispatch(tacticalAnalysisSlice.actions.setLoading(true));
            const receivedId = response.data.id;
            const newSocket = io(`http://localhost:5000/`);
            newSocket.on("connect", () => {
              newSocket.emit("join_room", { roomId: receivedId });
              newSocket.emit("start_processing", {
                video_path: receivedId,
                type: "TACTICAL",
              });
              console.log(
                `Connected to Socket.IO channel for ID: ${receivedId}`
              );
            });
            setSocket(newSocket);
          } else {
            console.error("File upload failed");
          }
        } catch (error) {
          console.error("Error during file upload:", error);
        }
      } else {
        setVideoSrc(null);
      }
    } else {
      setVideoSrc(null);
    }
  };

  const handleCancelUpload = () => {
    if (cancelSourceRef.current) {
      cancelSourceRef.current.cancel("Upload canceled by user");
    }
    setUploadProgress(0);
  };
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      paddingTop: "80px",
      paddingLeft: "10px",
      paddingRight: "10px",
      backgroundColor:"#9DB2BF"
    }}>
      <Grid container spacing={0}>
        
        <Grid item xs={12} md={4} sx={{
        
        }}>
          <Paper elevation={0} sx={{
            height: "90vh",
            padding: "5px",
            backgroundColor:"#526D82",
            borderRadius: "10px",
          }}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
          {videoSrc && (
            <div style={{
              textAlign:"start",
              fontWeight: "bold",
              display:"flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
            }}>
              <ReactPlayer
              url={videoSrc}
              controls
              width="480px"
              height="auto"
            />
          {uploadProgress > 0 && uploadProgress < 100 && (
            <Button
              sx={{
                margin: "10px",
              }}
              component="label"
              variant="contained"
              startIcon={<CancelIcon />}
              color="error"
              onClick={handleCancelUpload}
            >
              Cancel
            </Button>
          )}
          {uploadProgress > 0 && uploadProgress < 100 && (
                  <div
                    style={{
                      position: "relative",
                      textAlign: "center",
                      alignItems: "start",
                      display: "flex",
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={uploadProgress}
                    />
                  </div>
                )}

    {loading && socket && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            {" "}
            <CircularProgress />
          </div>
        )}

            </div>

          )
          
            }
            <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            disabled={uploadProgress > 0 && uploadProgress < 100}
            sx={{
              margin: "10px",
            }}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              accept="video/mp4"
              onChange={(event) => {
                handleFileChange(event);
              }}
            />
          </Button>
            {length > 0 && (
              <div style={{
                width: "100%",
              }}>
              <FrameSlider />
              
              </div>
            )}
            </Grid>
             <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "end",
          }}
        >
          {length !== 0 && (
            <div>

            <img
              src={frames[slider-1]}
              className="result_image"
              alt="Received Image1"
              style={{
                width: "640px",
                height: "360px",
              }}
            />
            <Stack
              direction="row"
              flexWrap="wrap"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5px",
                "&>*": {
                  borderRadius: "50%",
                  backgroundColor: "white",
                  marginLeft: "10px",
                  "&:hover": {
                    color: "#08a4ff",
                    border: "2px solid #0883ff",
                  },
                },
              }}
            >
              {subPlots.map((plot: any) => {
                return (
                  <Tooltip title={plot.title} key ={plot.id} placement="bottom">
                    <IconButton
                      onClick={() => setViewHandler(plot.function)}
                      sx={{
                        backgroundColor: "white",
                        color: view[plot.function] ? "#0883ff" : "black",
                        border: view[plot.function]
                          ? "2px solid #0883ff"
                          : "2px solid gray",
                        margin: "5px",
                        padding: "10px",
                      }}
                    >
                      {plot.icon}
                    </IconButton>
                  </Tooltip>
                );
              })}
              <SaveAnalysisPopup/>
            </Stack>
            </div>
          )}
        </Grid>
        
        </Grid>
        </Paper>
          </Grid>

          <Grid item xs={12} md={8} sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            {length !== 0 && (
               <div style={
                {
                  height: "90vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }
               }>
                <TeamDetails />
              {view.kde_plots && (
                <div>
                 <Grow in={view.kde_plots}>
                 <Box component="fieldset">
                 <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px",
                        width: "50%",
                      }}
                    >
                      <DensityPlot
                        data={info[slider - 1].filter((item) => item.team === 0)}
                        color="red"
                        levels={10}
                      />
                    </div>
                    <div
                      style={{
                        padding: "10px",
                        width: "50%",
                      }}
                    >
                      <DensityPlot
                        data={info[slider - 1].filter((item) => item.team === 1)}
                        color="blue"
                        levels={10}
                      />
                    </div>
                  </div>
                 </Box>
                  </Grow>
                </div>
              )}
              {view.formations && (
                <div>
                  <Grow in={view.formations}>
                  <Box component="fieldset">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px",
                        width: "50%",
                      }}
                    >
                      <Soccerfield
                        data={info[slider - 1].filter((item) => item.team === 0)}
                      />
                    </div>
                    <div
                      style={{
                        padding: "10px",
                        width: "50%",
                      }}
                    >
                      <Soccerfield
                        data={info[slider - 1].filter((item) => item.team === 1)}
                      />
                    </div>
                  </div>
                  </Box>
                  </Grow>
                </div>
              )}
              {view.presence_maps && (
                <Grow in={view.presence_maps}>
                               <Box component="fieldset">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      width: "50%",
                    }}
                  >
                    <PresenceMaps
                      data={info[slider - 1].filter((item) => item.team === 0)}
                    />
                  </div>
                  <div
                    style={{
                      padding: "10px",
                      width: "50%",
                    }}
                  >
                    <PresenceMaps
                      data={info[slider - 1].filter((item) => item.team === 1)}
                    />
                  </div>
                </div>
                </Box>
                </Grow>
              )}
              {view.passings && (
               <Grow in={view.passings}>
                 <Box component="fieldset">
                
               <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "10px",
                      width: "100%",
                    }}
                  >
                    <PassingNetwork/>
                  </div>
                 
                </div>
               </Box>
                </Grow>
              )}
              {view.individual && 
              <IndividualTracking />
              }
           </div>
            )}
           
          </Grid>

      </Grid>
      
    </div>
  );
}

export default Dashboard;
