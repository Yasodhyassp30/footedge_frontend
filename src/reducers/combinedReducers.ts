import { tacticalAnalysisSlice } from "./tacticalAnalysis";
import { combineReducers } from "@reduxjs/toolkit";


export const rootReducer = combineReducers({
    tacticalAnalysis: tacticalAnalysisSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>;