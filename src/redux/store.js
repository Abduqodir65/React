import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import flightReducer from "./flightSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        flights: flightReducer,
    }
})