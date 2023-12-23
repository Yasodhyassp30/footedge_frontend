import { Button, Grid, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Soccerfield from "./soccerfield";
import DensityPlot from "./kdePlot";
import IndividualTracking from "./individualPlayers";

interface TeamActivityProps {
  socket: Socket | null;
  url: string | null;
}
export interface players {
  team: number;
  color: number[];
  coordinates: number[];
}
interface ImageData {
  frame: string[];
  info: players[][];
}
const TeamActivity: React.FC<TeamActivityProps> = ({ socket, url }) => {
  const [imageData, setImageData] = useState<ImageData>({
    frame: [],
    info: [],
  });
  const [tab, SetTab] = useState<number>(0);
  const [slider, setSlider] = useState<number>(0);
  useEffect(() => {
    if (socket) {
      socket.on("message_from_server", (data) => {
        setImageData((prevState) => ({
          frame: [...prevState.frame, `data:image/jpeg;base64, ${data.frame}`],
          info: [...prevState.info, data.info],
        }));
        if (imageData.frame.length == 1) {
          setSlider(1);
        }
      });
    }
  }, [socket]);

  useEffect(() => {}, [imageData.info]);

  useEffect(() => {
    setImageData({
      frame: [],
      info: [],
    });
  }, [url]);
  return (
    <div>
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
                <Soccerfield data={imageData.info[slider - 1]} />
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
              aria-label="Temperature"
              defaultValue={1}
              value={slider}
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={imageData.frame.length}
              onChange={(e, val) => {
                setSlider(Number(val));
              }}
            />
          )}
        </Grid>
        <Grid item xs={1} md={3}></Grid>

        {tab === 1 && <IndividualTracking />}
        
      </Grid>
      <Grid container spacing={0}>
      {tab === 0 && (
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
              {imageData.info[slider - 1] !== undefined &&(
                <DensityPlot
                  data={imageData.info[slider - 1].filter(
                    (item) => item.team === 0
                  )}
                  color="red"
                />)}
              </Grid>
              )}
            
            {tab === 0 && (<Grid
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
                <DensityPlot
                  data={imageData.info[slider - 1].filter(
                    (item) => item.team === 1
                  )}
                  color="blue"
                />
              ) }
            </Grid>
        )}
      </Grid>
    </div>
  );
};

export default TeamActivity;
