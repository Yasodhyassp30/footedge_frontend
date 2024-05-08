import React, { useEffect, useState } from "react";
import { players } from "./teamActivity";
import {
  Button,
  Grid,
  Grow,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import DensityPlot from "./kdePlot";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector, useDispatch } from "react-redux";
import { tacticalAnalysisSlice } from "../../../reducers/tacticalAnalysis";
import { RootState } from "../../../reducers/combinedReducers";
import axios from "axios";
import DensityPlotTless from "./kdeTransformless";

const IndividualTracking = () => {
  const info = useSelector((state: RootState) => state.tacticalAnalysis.info);
  const players = useSelector(
    (state: RootState) => state.tacticalAnalysis.players
  );
  const dispatch = useDispatch();
  const [trackers, setTrackers] = useState<number[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [playerData, setPlayerData] = useState<players[]>([]);
  const [tempName, setTempName] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth);
  const [analysis, setAnalysis] = useState<any>([]);
  const [selectAnalysis, setSelectAnalysis] = useState<number>(-1);
  const [anaysisPlayers, setAnalysisPlayers] = useState<any>([]);
  const [selectAnalysisPlayer, setSelectAnalysisPlayer] = useState<number>(-1);
  useEffect(() => { 
    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:5000/api/analysis/users/${user.id}`,{})
        setAnalysis(response.data);
      }catch(e){
        console.log(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setSelectAnalysisPlayer(-1);
    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:5000/api/analysis/players/${analysis[selectAnalysis]._id.$oid}`,{})
        setAnalysisPlayers(response.data.analysis.players);
        
      }catch(e){
        console.log(e);
      }
    }
    if(selectAnalysis !== -1){
      fetchData();
    }
  }, [selectAnalysis]);

  useEffect(() => {
    let temp: number[] = [];
    info.forEach((frame) => {
      frame.forEach((player) => {
        if (!temp.includes(player.tracker_id)) {
          temp.push(player.tracker_id);
        }
      });
    });
    setTrackers(temp);
  }, [info]);

  useEffect(() => {
    let temp: players[] = [];
    info.forEach((frame) => {
      frame.forEach((player) => {
        if (player.tracker_id === selectedPlayer) {
          temp.push(player);
        }
      });
    });
    setPlayerData(temp);
  }, [selectedPlayer]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: "10px",
            display: "block",
            justifyContent: "center",
            textAlign: "start",
            alignItems: "start",
          }}
        >
            <Select
              defaultValue={selectedPlayer}
              value={selectedPlayer}
              size="small"
              onChange={(e) => setSelectedPlayer(Number(e.target.value))}
              sx={{
                width: "100%",
              }}
            >
              <MenuItem value={0} disabled>
                Select Player
              </MenuItem>
              {trackers.map((player, index) => (
                <MenuItem key={index + 1} value={player}>
                  {players[player].name == ""
                    ? "Player " + player
                    : players[player].name}
                </MenuItem>
              ))}
            </Select>

            {selectedPlayer !== 0 && (
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <TextField
                  size="small"
                  label="Change Name"
                  sx={{
                    display: "block",
                    marginright: "10px",
                  }}
                  value={tempName}
                  onChange={(e) => {
                    setTempName(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  sx={{
                    marginLeft: "10px",
                  
                  }}
                  onClick={() => {
                    dispatch(
                      tacticalAnalysisSlice.actions.setNames({
                        tracker_id: selectedPlayer,
                        name: tempName,
                      })
                    );
                  }}
                >
                  <SaveIcon /> Save
                </Button>
                {/*               <Button variant="outlined" color ="error" sx={{
                marginLeft: "10px",
              
              }} onClick={()=>{
                deleteTracker(selectedPlayer);
              }}>
                <DeleteIcon/> Delete Tracker
              </Button> */}
              
              </div>
            )}
            <DensityPlot data={playerData} color={"red"} levels={5} />
        </Grid>
        <Grid
          item
          xs={10}
          md={6}
          sx={{
            minHeight: "320px",
            width: "100%",
            padding: "10px",
          }}
        >
         {selectedPlayer !== 0 ? <Grow in={true}>
          <div>
         <Select
              defaultValue={selectAnalysis}
              value={selectAnalysis}
              size="small"
              onChange={(e) => setSelectAnalysis(Number(e.target.value))}
              sx={{
                width: "100%",
              }}
            >
              <MenuItem value={-1} disabled>
                Select Previous
              </MenuItem>
              {analysis.map((single: any, index:number) => {
                return (
                  <MenuItem key={index + 1} value={index}>
                    {single.name}
                  </MenuItem>
                );
              })}
            </Select>
            {selectAnalysis !== -1 && (
               <Select
               defaultValue={selectAnalysisPlayer}
               value={selectAnalysisPlayer}
               size="small"
               onChange={(e) => setSelectAnalysisPlayer(Number(e.target.value))}
               sx={{
                 width: "100%",
                 marginTop: "10px",
                 marginBottom: "90px",
               }}
             >
               <MenuItem value={-1} disabled>
                 Select Player
               </MenuItem>
               {anaysisPlayers.map((single: any, index:number) => {
                 return (
                   <MenuItem key={index + 1} value={index}>
                     {(single.name === "") ? "Player " + single.id : single.name}
                   </MenuItem>
                 );
               })}
             </Select>
            )}

             {selectAnalysisPlayer !== -1 && <DensityPlotTless posistions={anaysisPlayers[selectAnalysisPlayer]} color={"blue"} levels={5} />}
            </div>
          </Grow> : <></>}
        </Grid>
      </Grid>
    </div>
  );
};
export default IndividualTracking;
