import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { authSlice } from "./authSlice";

export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authSlice.reducer
    },

    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})