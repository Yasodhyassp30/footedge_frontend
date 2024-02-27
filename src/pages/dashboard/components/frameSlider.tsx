import { Grid, IconButton, Slider, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import NavigationIcon from "@mui/icons-material/Navigation";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";

export default function FrameSlider() {
    const [slider,setSlider] = useState<number>(1);
    const [play,setPlay] = useState<boolean>(false);
    const [markers, setMarkers] = useState<number[]>([]);

    const setMarkersHandler = () => {
        if (!markers.includes(slider)) {
            setMarkers([...markers, slider]);
        } else {
            setMarkers(markers.filter((item) => item !== slider));
        }
    }

    const nextMarkerHandler = () => {
        const nextMarker = markers.filter((item) => item > slider);
        if (nextMarker.length > 0) {
            setSlider(nextMarker[0]);
        }
    }

    const previousMarkerHandler = () => {
        const previousMarker = markers.filter(
            (item) => item < slider
          );
          if (previousMarker.length > 0) {
            setSlider(previousMarker[previousMarker.length - 1]);
          }
    }

    const playHandler = () => {
        setPlay(!play);
    }

    const controllerButtons =[
      {
        icon: <FastRewindIcon />,
        handler: previousMarkerHandler
      },
      {
        icon: play ? <PauseCircleIcon /> : <PlayCircleIcon />,
        handler: playHandler
      },
      {
        icon: <NavigationIcon />,
        handler: setMarkersHandler
      },
      {
        icon: <FastForwardIcon />,
        handler: nextMarkerHandler
      }
    ]
    useEffect(() => {
      if (play) {
        const interval = setInterval(() => {
          if (slider < 100) {
            setSlider(slider + 1);
          } else {
            setPlay(false);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }, [play, slider]);
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
              sx={{
                width: "60%",
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
              {controllerButtons.map((button) => {
                return (
                  <IconButton
                    onClick={button.handler}>
                    {button.icon}
                  </IconButton>
                );
              })}
            </Stack>
            </Grid>
        </Grid>
    </div>
  )
}
