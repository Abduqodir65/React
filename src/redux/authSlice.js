import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        }
    }
})

export const { login } = authSlice.actions;