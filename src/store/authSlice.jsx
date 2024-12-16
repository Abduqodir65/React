import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        token: localStorage.getItem("authToken"),
    },
    reducers: {
        login: function (state, action) {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;

            localStorage.setItem("authToken", action.payload.token);
        },
    },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
