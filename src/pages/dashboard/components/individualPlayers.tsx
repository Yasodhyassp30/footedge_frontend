import React, { useEffect, useState } from "react";
import { players,totalTeam } from "./teamActivity";
import { Grid, MenuItem, Select } from "@mui/material";
import DensityPlot from "./kdePlot";

export interface localizationData {
  info: players[][];
  team1: number[];
  team2: number[];
  details : totalTeam;
}

const IndividualTracking: React.FC<localizationData> = ({ info,team1,team2,details }) => {
  const [trackers, setTrackers] = useState<number[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [playerData, setPlayerData] = useState<players[]>([]);
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
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Select
            defaultValue={selectedPlayer}
            value={selectedPlayer}
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
                {player}
              </MenuItem>
            ))}
          </Select>
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
