import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authReducer";
import { tacticalAnalysisSlice } from "./tacticalAnalysis";


export const rootReducer = combineReducers({
    tacticalAnalysis: tacticalAnalysisSlice.reducer,
    auth: authSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>;