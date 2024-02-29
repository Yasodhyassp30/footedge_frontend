import { Divider, Paper, TextField } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../reducers/combinedReducers";
import { tacticalAnalysisSlice } from "../../../reducers/tacticalAnalysis";

export default function TeamDetails() {
  const dispatch = useDispatch();
  const team1 = useSelector(
    (state: RootState) => state.tacticalAnalysis.teams[0]
  );
  const team2 = useSelector(
    (state: RootState) => state.tacticalAnalysis.teams[1]
  );
  const team1Color = useSelector(
    (state: RootState) => state.tacticalAnalysis.colors[0]
  );
  const team2Color = useSelector(
    (state: RootState) => state.tacticalAnalysis.colors[1]
  );

  return (
    <div>
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          padding: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
            style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                backgroundColor: team1Color.length !== 0 ? `rgb(${team1Color[2]},${team1Color[1]},${team1Color[0]})` : "grey",
            }}
        ></div>
        <TextField
          label="Team 1"
          size="small"
          sx={{
            "& fieldset": { border: "none" },
            textAlign: "center",
          }}
          value={team1}
          onChange={(e) => {
            dispatch(
              tacticalAnalysisSlice.actions.setTeamNames({
                name: e.target.value,
                team: 0,
              })
            );
          }}
        />
        <Divider orientation="vertical" variant="middle" flexItem />

        <TextField
          label="Team 2"
          size="small"
          sx={{
            "& fieldset": { border: "none" },
            textAlign: "center",
          }}
          value={team2}
          onChange={(e) => {
            dispatch(
              tacticalAnalysisSlice.actions.setTeamNames({
                name: e.target.value,
                team: 1,
              })
            );
          }}
        />
        <div
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
            backgroundColor: team2Color.length !== 0 ? `rgb(${team2Color[2]},${team2Color[1]},${team2Color[0]})` : "grey",
          }}
        ></div>
      </Paper>
    </div>
  );
}
