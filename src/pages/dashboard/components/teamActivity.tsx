import { Button, CircularProgress, Container, Grid, IconButton, Slider, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Soccerfield from "./soccerfield";
import DensityPlot from "./kdePlot";
import IndividualTracking from "./individualPlayers";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import NavigationIcon from "@mui/icons-material/Navigation";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import SettingsIcon from '@mui/icons-material/Settings';
import VideoSettings from "./videoSettings";
import { info } from "console";
import PresenceMaps from "./presenceMaps";

interface TeamActivityProps {
  socket: Socket | null;
  url: string | null;
}
export interface players {
  team: number;
  color: number[];
  coordinates: number[];
  tracker_id: number;
}
interface ImageData {
  frame: string[];
  info: players[][];
}
interface TeamStates {
  team1: number;
  team2: number;
}
export interface teamPlayers {
  name: string;
  color: number[];
}


export interface totalTeam {
  [key: number]: TeamStates;
}
const TeamActivity: React.FC<TeamActivityProps> = ({ socket, url }) => {
  const [imageData, setImageData] = useState<ImageData>({
    frame: [],
    info: [],
  });
  const [deletedTrackers, setDeletedTrackers] = useState<number[]>([]);
  const [teamStates, setTeamstates] = useState<totalTeam>({});
  const [playerdetails,setplayerDetails] = useState<{[key:number]:teamPlayers}>({});
  const [tab, SetTab] = useState<number>(0);
  const [slider, setSlider] = useState<number>(1);
  const [team1, setTeamColors1] = useState<number[]>([]);
  const [team2, setTeamColors2] = useState<number[]>([]);
  const [teamNames, setTeamNames] = useState<string[]>(['Team 1','Team 2']);
  const [play, setPlay] = useState<boolean>(false);
  const [markers, setMarkers] = useState<number[]>([]);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  function setNames(id:number,name:string){
    setplayerDetails((prevState) => ({
      ...prevState,
      [id]: { name: name, color: [0,0,0] },
    }))
  
  }

  function deleteTrackers(id: number) {
    setDeletedTrackers([...deletedTrackers, id]);
    delete playerdetails[id];
    setplayerDetails(playerdetails);
    const playerRemoved = imageData.info.map((frame) =>{
      return frame.filter((player) => player.tracker_id !== id);
    }
    )
    setImageData((prevState) => ({
      frame: prevState.frame,
      info: playerRemoved,
    }));  
  }
  useEffect(() => {
    if (socket) {
      socket.on("message_from_server", (data) => {
        if (loading) {
          setLoading(false);
        }
        for (let i = 0; i < data.info.length; i++) {
          if (!(data.info[i].tracker_id in setplayerDetails)) {
            setplayerDetails((prevState) => ({
              ...prevState,
              [data.info[i].tracker_id]: { name: `Player ${data.info[i].tracker_id}`, color: data.info[i].color },
            }))
          }
          if (data.info[i].team === 0) {
            if (team1.length === 0) {
              setTeamColors1(data.info[i].color);
            }
            teamStates[data.info[i].tracker_id] = { team1: 1, team2: 0 };

          } else if (data.info[i].team === 1) {
            if (team2.length === 0) {
              setTeamColors2(data.info[i].color);
            }

              teamStates[data.info[i].tracker_id] = { team1: 0, team2: 1 };
            
          }
          data.info[i].coordinates = [data.info[i].coordinates[0] /1680 *100, data.info[i].coordinates[1] /1080 *100]
        }
        setImageData((prevState) => ({
          frame: [...prevState.frame, `data:image/jpeg;base64, ${data.frame}`],
          info: [...prevState.info, data.info],
        }));
        if (imageData.frame.length === 1) {
          setSlider(1);
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    setTeamColors1([])
    setTeamColors2([])
    setTeamNames(['Team 1','Team 2'])
    setTeamstates({})
    setImageData({
      frame: [],
      info: [],
    });
    setSlider(1);
    setMarkers([]);
  },[url])

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        if (slider < imageData.frame.length) {
          setSlider(slider + 1);
        } else {
          setPlay(false);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [play, slider]);

  useEffect(() => {}, [imageData.info]);

  useEffect(() => {
    setImageData({
      frame: [],
      info: [],
    });
  }, [url]);
  return (
    <div>
      {loading && socket && <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}> <CircularProgress/></div>}

      <Container maxWidth="lg">
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            minHeight: "320px",
            width: "100%",
            padding: "10px",
          }}
        >
          {imageData.frame.length !== 0 && (
            <img
              src={imageData.frame[slider - 1]}
              className="result_image"
              alt="Received Image1"
            />
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            minHeight: "320px",
            width: "100%",
            height: "100%",
            padding: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {imageData.info[slider - 1] !== undefined ? (
                <Soccerfield
                  data={imageData.info[slider - 1]}
                  details={teamStates}
                  team1={team1}
                  team2={team2}
                />
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item xs={12}>
              {imageData.info[slider - 1] !== undefined ? (
                <div>
                  Detections
                  <div>
                    <h1>{imageData.info[slider - 1].length}</h1>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} md={3}></Grid>
        <Grid
          item
          xs={10}
          md={6}
          sx={{
            width: "100%",
            padding: "10px",
          }}
        >
          {imageData.info[slider - 1] !== undefined && (
            <div>
              <Button
                sx={{
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "0px",
                  backgroundColor: tab === 0 ? "#42a5f5" : "#e0e0e0",
                  color: tab === 0 ? "white" : "black",
                }}
                component="label"
                variant="outlined"
                onClick={() => {
                  SetTab(0);
                }}
              >
                Team Analytics
              </Button>
              <Button
                sx={{
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  backgroundColor: tab === 1 ? "#42a5f5" : "#e0e0e0",
                  color: tab === 1 ? "white" : "black",
                }}
                component="label"
                variant="outlined"
                onClick={() => {
                  SetTab(1);
                }}
              >
                Player Tracks
              </Button>
            </div>
          )}
        </Grid>
        <Grid item xs={1} md={3}></Grid>
        <Grid item xs={1} md={3}></Grid>
        <Grid
          item
          xs={10}
          md={6}
          sx={{
            width: "100%",
            padding: "10px",
          }}
        >
          {imageData.info.length !== 0 && (
            <Slider
              defaultValue={slider}
              value={slider}
              valueLabelDisplay="off"
              marks={markers.map((value) => ({
                value: value,
              }))}
              step={1}
              min={1}
              max={imageData.frame.length}
              onChange={(e, val) => {
                setSlider(Number(val));
              }}
            />
          )}
          {imageData.info.length !== 0 && (
            <Stack
              direction="row"
              flexWrap="wrap"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
                color: "black",
                height: "50px",
                padding: "10px",
                "&>*": {
                  cursor: "pointer",
                  ":hover": {
                    color: "#42a5f5",
                  },
                },
              }}
            >
              <IconButton
                onClick={() => {
                  const previousMarker = markers.filter(
                    (item) => item < slider
                  );
                  if (previousMarker.length > 0) {
                    setSlider(previousMarker[previousMarker.length - 1]);
                  }
                }}
              >
                <FastRewindIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setPlay(!play);
                }}
              >
                {play ? <PauseCircleIcon /> : <PlayCircleIcon />}
              </IconButton>
              <IconButton
                onClick={() => {
                  if (!markers.includes(slider)) {
                    setMarkers([...markers, slider]);
                  } else {
                    setMarkers(markers.filter((item) => item !== slider));
                  }
                }}
              >
                <NavigationIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  const nextMarker = markers.filter((item) => item > slider);
                  if (nextMarker.length > 0) {
                    setSlider(nextMarker[0]);
                  }
                }}
              >
                <FastForwardIcon />
              </IconButton>
              <IconButton onClick={()=>{
                setSettingsOpen(!settingsOpen);
              }}>
                <SettingsIcon />
              </IconButton>
            </Stack>
          )}
        </Grid>
        <Grid item xs={1} md={3}></Grid>
        <Grid item xs={1} lg={2}></Grid>
        <Grid item xs={10} lg={8}>
          {settingsOpen && <VideoSettings/>}
        </Grid>
        <Grid item xs={1} lg={2}></Grid>

        {tab === 1 && (
          <IndividualTracking
            info={imageData.info}
            team1={team1}
            team2={team2}
            details={teamStates}
            players={playerdetails}
            setNames={setNames}
            deleteTracker={deleteTrackers}
          />
        )}
      </Grid>
      <Grid container spacing={0}>
        {tab === 0 && (
          <>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              minHeight: "320px",
              width: "100%",
              padding: "10px",
            }}
          >
            {imageData.info[slider - 1] !== undefined && (
              <div>
                <h2>{teamNames[0]}</h2>
                <div
                  style={{
                    height: "1em",
                    width: "100px",
                    backgroundColor: `rgb(${team1[2]}, ${team1[1]}, ${team1[0]})`,
                    margin: "10px",
                  }}
                ></div>
                <DensityPlot
                  data={imageData.info[slider - 1].filter(
                    (item) =>
                      teamStates[item.tracker_id].team1 >
                      teamStates[item.tracker_id].team2
                  )}
                  color="red"
                  levels={10}
                />
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              minHeight: "320px",
              width: "100%",
              padding: "10px",
            }}
          >
            {imageData.info[slider - 1] !== undefined && (
              <div>
                <h2>{teamNames[1]}</h2>
                <div
                  style={{
                    height: "1em",
                    width: "100px",
                    backgroundColor: `rgb(${team2[2]}, ${team2[1]}, ${team2[0]})`,
                    margin: "10px",
                  }}
                ></div>
                <DensityPlot
                  data={imageData.info[slider - 1].filter(
                    (item) =>
                      teamStates[item.tracker_id].team1 <
                      teamStates[item.tracker_id].team2
                  )}
                  color="blue"
                  levels={10}
                />
              </div>
            )}
          </Grid>
          </>
        )}

      </Grid>
      </Container>
    </div>
  );
};

export default TeamActivity;
