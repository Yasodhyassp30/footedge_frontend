import { all, fork } from "redux-saga/effects";
import scoutingSaga from "./scoutingSaga";

function* rootSaga() {
  yield all([fork(scoutingSaga)]);
}

export default rootSaga;
