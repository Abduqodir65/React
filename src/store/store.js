import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import flightSlice from "./flightSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        flights: flightSlice
    }
})