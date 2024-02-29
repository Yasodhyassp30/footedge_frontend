import React, { useEffect, useState } from "react";
import { players } from "./teamActivity";
import {
  Button,
  Grid,
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
                }}
              >
                <TextField
                  size="small"
                  label="Change Name"
                  sx={{
                    display: "block",
                    marginBottom: "10px",
                  }}
                  value={tempName}
                  onChange={(e) => {
                    setTempName(e.target.value);
                  }}
                />
                <Button
                  variant="outlined"
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
