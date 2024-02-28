import { Grid, IconButton, Slider, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import NavigationIcon from "@mui/icons-material/Navigation";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../..';
import { RootState } from '../../../reducers/combinedReducers';
import { tacticalAnalysisSlice } from '../../../reducers/tacticalAnalysis';

export default function FrameSlider() {
    const dispatch = useDispatch<AppDispatch>();
    const slider = useSelector((state:RootState) => state.tacticalAnalysis.slider);
    const markers = useSelector((state:RootState) => state.tacticalAnalysis.markers);
    const length = useSelector((state:RootState) => state.tacticalAnalysis.info.length);
    const [play,setPlay] = useState<boolean>(false);

    const playHandler = () => {
        setPlay(!play);
    }
    const controllerButtons =[
      {
        icon: <FastRewindIcon />,
        handler: () => dispatch(tacticalAnalysisSlice.actions.nextMarker())
      },
      {
        icon: play ? <PauseCircleIcon /> : <PlayCircleIcon />,
        handler: playHandler
      },
      {
        icon: <NavigationIcon />,
        handler: () => dispatch(tacticalAnalysisSlice.actions.setMarkers())
      },
      {
        icon: <FastForwardIcon />,
        handler: () => dispatch(tacticalAnalysisSlice.actions.previousMarker())
      }
    ]
    useEffect(() => {
      if (play) {
        const interval = setInterval(() => {
          if (slider < length) {
            dispatch(tacticalAnalysisSlice.actions.setSlider(slider + 1));
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
                value: value as number,
              }))}
              step={1}
              min={1}
              max={length}
              onChange={(e, val) => {
                dispatch(tacticalAnalysisSlice.actions.setSlider(val));
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