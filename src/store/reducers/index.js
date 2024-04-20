import { combineReducers } from "redux";
import scoutingReducer from "./scoutingReducer";

const rootReducer = combineReducers({
    scouting: scoutingReducer
});

export default rootReducer;
