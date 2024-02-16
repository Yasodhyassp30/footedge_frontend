import { Button, Grid, IconButton, MenuItem, Paper, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { players, totalTeam } from "./teamActivity";
import { localizationData } from "./individualPlayers";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

function VideoSettings() {
  const [trackers, setTrackers] = useState<number[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(0);
  const [playerData, setPlayerData] = useState<players[]>([]);

  return (
    <div>
      <Paper elevation={0}>
      <h3>Video Settings</h3>
        <Grid
          container
          spacing={0}
          sx={{
            padding: "10px",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              "&>*": {
                margin: "10px",
              },
            }}
          >
            
            <div>
            <TextField label="Team 1" size="small"/>
            </div>
     <TextField label="Team 2" size="small" sx={{
        margin: "10px",
     }} />       
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              defaultValue={selectedPlayer}
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(Number(e.target.value))}
              size="small"
              sx={{
                width: "50%",
                margin: "10px",
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

            <Select
              defaultValue={selectedPlayer}
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(Number(e.target.value))}
              size="small"
              sx={{
                width: "50%",
                margin: "10px",
              }}
            >
              <MenuItem value={0} disabled>
                Select Team
              </MenuItem>
                <MenuItem  value={1}>
                    Team 1
                </MenuItem>
                <MenuItem  value={2}>
                    Team 2
                </MenuItem>
            </Select>
            <div>
            <TextField label="Name" size="small" sx={{
                width: "50%",
            }} />
            </div>
            <div>
            <Button sx={{
                margin: "10px",
            }}>
                <SaveIcon />
            </Button>
            <Button sx={{
                margin: "10px",
            }} color="error">
                <DeleteIcon />
            </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default VideoSettings;
