import {
  Box,
  Divider,
  Grid,
  Grow,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { tacticalAnalysisSlice } from "../../../reducers/tacticalAnalysis";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../reducers/combinedReducers";
import { Button, Flex } from "antd";
import { Close, History } from "@mui/icons-material";
import PassingNetwork from "./passingNetwork";
import DensityPlot from "./kdePlot";
import Soccerfield from "./soccerfield";



function PreviousMatches() {
  const [details, setDetails] = React.useState<any[]>([]);
  
  const [matchDetails, setMatchDetails] = React.useState<any>({});
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth);
  const [trackers, setTrackers] = useState<any[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [selectedPlayerData, setSelectedPlayerData] = useState<any>([]);
  const [selected, setSelected] = React.useState<string>("");
  const slider = useSelector((state: RootState) => state.tacticalAnalysis.slider);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/analysis/${user.id}`,
          {}
        );
        setDetails(response.data);

      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      if (selected !== "") {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/analysis/${selected}/players`,
            {}
          );
          setMatchDetails(response.data);
          
          dispatch(tacticalAnalysisSlice.actions.setPossesionsWhole(response.data.passings));
          
          
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchMatches();
  }, [selected]);

  useEffect(() => {
   if(matchDetails.analysis !== undefined){
    let temp: any[] = [];
    matchDetails.analysis.players.forEach((arr:any) => {

          temp.push({
            id:arr.id,
            name:arr.name,
          });

      });
    setTrackers(temp);
    console.log(temp);
   }
  }, [matchDetails]);

  useEffect(() => {
   if(matchDetails.analysis !== undefined){
    setSelectedPlayerData(matchDetails.analysis.players.filter((item:any)=>item.id==selectedPlayer)[0].positions)
   }
  }, [selectedPlayer]);

  return (
        <div>
      {selected === "" && (
        <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "block",
            width: "60%",
            marginTop: "10px",
            padding: "20px",
            backgroundColor: "#27374D",
            borderRadius: "10px",
            opacity: "0.9",
            maxHeight: "calc(100vh - 160px)",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "start",
              color: "white",
            }}
          >
            <History /> Previous Analysis
          </Typography>
          {details.map((match: any) => {
            return (
              <Paper
                elevation={1}
                key={match._id.$oid}
                sx={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#DDE6ED",
                  borderRadius: "10px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                      backgroundColor: `rgb(${match.analysis.colors[0][2]},${match.analysis.colors[0][1]},${match.analysis.colors[0][0]})`,
                    }}
                  ></div>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "15px",
                    }}
                  >
                    {match.analysis.teams[0]
                      ? match.analysis.teams[0]
                      : "Team 1"}
                  </Typography>
                  <Divider orientation="vertical" variant="middle" flexItem />

                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      fontSize: "15px",
                    }}
                  >
                    {match.analysis.teams[1]
                      ? match.analysis.teams[1]
                      : "Team 2"}
                  </Typography>
                  <div
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                      backgroundColor: `rgb(${match.analysis.colors[1][2]},${match.analysis.colors[1][1]},${match.analysis.colors[1][0]})`,
                    }}
                  ></div>
                </div>
                <Typography variant="h6">{match.name}</Typography>
                <Button
                  onClick={() => {
                    setSelected(match._id.$oid);
                  }}
                >
                  Visualize
                </Button>
              </Paper>
            );
          })}
        </div>
        </div>
      )}
      {selected !== ""? matchDetails.analysis !==undefined && (
        <div
          style={{
            display: "block",
            width: "100%",
            marginTop: "10px",
            padding: "20px",
            backgroundColor: "#27374D",
            borderRadius: "10px",
            opacity: "0.9",
            maxHeight: "calc(100vh - 160px)",
            overflowY: "auto",
          }}
        >
            <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        width:"100%"
    }}>
        <Grid container spacing={2}>
        <Grid item xs={4} sx={{
            display:"flex",
            justifyContent:"start",
            alignItems:"start",
            width:"100%"
        
        }}>
        <Button  
  onClick={() => {
    dispatch(tacticalAnalysisSlice.actions.reset());
    setSelected("");
  }}
>
  <Close />Back
</Button>
            </Grid>
            <Grid item xs={4} sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            }}>
            <Slider
              defaultValue={slider}
              value={slider}
              valueLabelDisplay="off"
              step={1}
              min={1}
              max={matchDetails.info.length}
              onChange={(e, val) => {
                dispatch(tacticalAnalysisSlice.actions.setSlider(val));
              }}
              sx={{
                width: "60%",
                color: "#DDE6ED",
              }}
            />
            </Grid>
        </Grid>
        <div style={{
                      maxHeight: "calc(100vh - 160px)",
                      overflowY: "auto",
        }}>
            <Typography variant="h6">{details.filter((item:any)=>item._id.$oid==selected)[0].name}</Typography>
                 <Grow in={true}>
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
                        data={matchDetails.info[slider - 1].filter((item:any) => item.team === 0)}
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
                        data={matchDetails.info[slider - 1].filter((item:any) => item.team === 1)}
                        color="blue"
                        levels={10}
                      />
                    </div>
                  </div>
                 </Box>
                  </Grow>
                </div>
                <div>
                  <Grow in={true}>
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
                        data={matchDetails.info[slider - 1].filter((item:any) => item.team === 0)}
                      />
                    </div>
                    <div
                      style={{
                        padding: "10px",
                        width: "50%",
                      }}
                    >
                      <Soccerfield
                        data={matchDetails.info[slider - 1].filter((item:any) => item.team === 1)}
                      />
                    </div>
                  </div>
                  </Box>
                  </Grow>
                </div>
          <Grow in={true}>
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
                    height: "640px",
                  }}
                >
                  <PassingNetwork />
                </div>
              </div>
            </Box>
          </Grow>

         <div style={{
            width:"50%",
         }}>
         <Select
              defaultValue={selectedPlayer}
              value={selectedPlayer}
              size="small"
              onChange={(e) => {
                setSelectedPlayer(Number(e.target.value))}}
              sx={{
                width: "100%",
                backgroundColor: "white",
              }}
            >
              <MenuItem value={0} disabled>
                Select Player
              </MenuItem>
              {trackers.map((player:any, index:number) => (
                <MenuItem key={index + 1} value={player.id}>
                  {trackers[index].name == ""
                    ? "Player " + trackers[index].id
                    : trackers[index].name}
                </MenuItem>
              ))}
            </Select>
            
            <DensityPlot data={selectedPlayerData.map((item:any)=>({coordinates:item}))} color={"red"} levels={5} />

         </div>
        </div>
        </div>
      ):<></>}
    </div>
  );
}

export default PreviousMatches;
