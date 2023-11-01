import locationReducer from "./slices/locationSlice"
import authSliceReducer from "./slices/authSlice"
import dataSliceReducer from "./slices/authSlice"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        location:locationReducer,
        auth:authSliceReducer,
        data:dataSliceReducer
    }
})