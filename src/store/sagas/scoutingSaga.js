import { all, call, put, takeEvery } from "redux-saga/effects";
import api from "../../utils/api";
import { fetchAllScoutingSkills } from "../routines/actions";

function* getAllSkillsSaga() {
  try {
    const skills = yield call(api, "/skills");
    yield put(fetchAllScoutingSkills.success(skills));
  } catch (error) {
    yield put(fetchAllScoutingSkills.failure(error));
  }
}

export default function* root() {
  yield all([
    yield takeEvery(fetchAllScoutingSkills.TRIGGER, getAllSkillsSaga),
  ]);
}
