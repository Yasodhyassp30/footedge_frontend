import { slider } from "@material-tailwind/react";
import { createSlice } from "@reduxjs/toolkit";
import { players, teamPlayers } from "../pages/dashboard/components/teamActivity";


const initialState = {

    info:[] as players[][],
    frame:[] as string[],
    loading: false,
    slider: 0,
    markers:[] as Number[],
    players:{} as {[key:number]:teamPlayers},
};

export const tacticalAnalysisSlice = createSlice({
  name: "tacticalAnalysis",
  initialState,
  reducers: {
    setSlider: (state, action) => {
        state.slider = action.payload;
      },
      setMarkers: (state) => {
        state.markers.push(Number(slider));
      },
      previousMarker: (state) => {
        const previousMarker = state.markers.filter(
          (item) => Number(item) < state.slider
        );
        if (previousMarker.length > 0) {
          state.slider = Number(previousMarker[previousMarker.length - 1]);
        }
      },
      nextMarker: (state) => {
        const nextMarker = state.markers.filter((item) => Number(item) > state.slider);
        if (nextMarker.length > 0) {
          state.slider = Number(nextMarker[0]);
        }
      },
      addFrames: (state, action) => {
        state.frame.push(action.payload.frame);
        state.info.push(action.payload.info);
        state.info.forEach((frame) => {
          frame.forEach((player) => {
            if (!Object.keys(state.players).includes(player.tracker_id.toString())) {
              state.players[player.tracker_id] = {
                name: "",
                color: player.color,
              };
            }
          });
        });
      },
      setNames: (state, action) => {
        state.players[action.payload.tracker_id].name = action.payload.name;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      reset: (state) => {
        state.info = [];
        state.frame = [];
        state.loading = false;
        state.slider = 1;
        state.markers = [];
      }
  },

});