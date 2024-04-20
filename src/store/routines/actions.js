import { createRoutine } from 'redux-saga-routines';

export const fetchAllScoutingSkills = createRoutine('FETCH_ALL_SCOUTING_SKILLS');

export const loginRoutine = createRoutine('auth/LOGIN');
export const logoutRoutine = createRoutine('auth/LOGOUT');
export const setUserDataRoutine = createRoutine('auth/SET_USER_DATA');