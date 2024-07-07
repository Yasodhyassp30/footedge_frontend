import { Container, Grid } from "@mui/material";
import { Socket } from "socket.io-client";
import Soccerfield from "./soccerfield";
import { RootState } from "../../../reducers/combinedReducers";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Save } from "@mui/icons-material";
import { Typography } from "antd";
import SaveAnalysisPopup from "./saveAnalysis";


export interface players {
  team: number;
  color: number[];
  coordinates: number[];
  tracker_id: number;
}
export interface ImageData {
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
const TeamActivity= ({frame}: {frame: string[]}) => {
const length = useSelector((state: RootState) => state.tacticalAnalysis.info.length);
const info = useSelector((state: RootState) => state.tacticalAnalysis.info);
const slider = useSelector((state: RootState) => state.tacticalAnalysis.slider);
  return (
    <div>
      <Container maxWidth="lg">
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "end",
          }}
        >
          {length !== 0 && (
            <img
              src={frame[slider-1]}
              className="result_image"
              alt="Received Image1"
              style={{
                width: "640px",
                height: "360px",
              }}
            />
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {info[slider - 1] !== undefined ? (
                <Soccerfield
                  data={info[slider - 1]}
                />
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item xs={12}>
              {info[slider - 1] !== undefined ? (
                  <SaveAnalysisPopup/>
              ) : (
                <div></div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
};

export default TeamActivity;
