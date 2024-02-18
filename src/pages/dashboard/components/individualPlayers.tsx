import React, { useEffect, useState } from "react";
import { players,teamPlayers,totalTeam } from "./teamActivity";
import { Button, Grid, IconButton, MenuItem, Paper, Select, TextField } from "@mui/material";
import DensityPlot from "./kdePlot";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export interface localizationData {
  info: players[][];
  team1: number[];
  team2: number[];
  details : totalTeam;
  players:{[key:number]:teamPlayers}
  setNames: any,
  deleteTracker: any
}

const IndividualTracking: React.FC<localizationData> = ({ info,team1,team2,details,players,setNames,deleteTracker }) => {
  const [trackers, setTrackers] = useState<number[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [playerData, setPlayerData] = useState<players[]>([]);
  const [tempName, setTempName] = useState<string>("");
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
          <Paper sx={{ padding: "10px" }}>
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
              <MenuItem key={index + 1} value={player} >
                { (players[player].name=="")? "Player " + player: players[player].name}
              </MenuItem>
            ))}
          </Select>

          {selectedPlayer !== 0 && (
            <div style={
              {
                marginTop: "10px",
              }
            }>
              <TextField size="small" label="Change Name" sx={{
                display: "block",
                marginBottom: "10px",
              }} value={tempName} onChange={(e)=>{
                setTempName(e.target.value);
              }}/>
              <Button variant="outlined" onClick={()=>{
                setNames(selectedPlayer,tempName);
              }}>
                <SaveIcon/> Save
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
          </Paper>
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
          <DensityPlot data={playerData} color={"red"} levels={5} />
        </Grid>
      </Grid>
    </div>
  );
};
export default IndividualTracking;
