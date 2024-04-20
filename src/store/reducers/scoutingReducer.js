import { fetchAllScoutingSkills } from "../routines/actions";

const initialState = {
  loading: true,
};

const scoutingReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchAllScoutingSkills.TRIGGER:
      return {...state, message: 1}
    case fetchAllScoutingSkills.SUCCESS:
      return {...state, message: 2, loading: false, data: action.payload}
    case fetchAllScoutingSkills.FAILURE:
      return {...state, message: 3, loading: false, error: action.payload}
    default:
      return state;
  }
}

export default scoutingReducer;
