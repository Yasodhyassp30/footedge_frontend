
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  id: null,
  email: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            state.email = parsedUser.user.email;
            state.token = parsedUser.user.token;
            state.id = parsedUser.user._id;
        }
        },
        logout: (state) => {
        state.token = null;
        state.id = null;
        state.email = null;
        },
    },
    
})