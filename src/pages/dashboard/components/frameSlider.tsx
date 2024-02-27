import { Grid, IconButton, Slider, Stack } from '@mui/material';
import React, { useState } from 'react'
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import NavigationIcon from "@mui/icons-material/Navigation";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

export default function FrameSlider() {
    const [slider,setSlider] = useState<number>(1);
    const [play,setPlay] = useState<boolean>(false);
    const [markers, setMarkers] = useState<number[]>([]);
    
  return (
    <div style={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <Slider
              defaultValue={slider}
              value={slider}
              valueLabelDisplay="off"
              marks={markers.map((value) => ({
                value: value,
              }))}
              step={1}
              min={1}
              max={100}
              onChange={(e, val) => {
                setSlider(Number(val));
              }}
            />
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
            </Stack>
            </Grid>
        </Grid>
    </div>
  )
}
