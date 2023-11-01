import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location : {
        lat:'',
        lng:''
    }
}

const locationSlice = createSlice({
    name:'location',
    initialState,
    reducers:{
        setLocation:(state,action)=>{
            const loc = action.payload;
            state.location.lat = loc.latitude;
            state.location.lng = loc.longitude
        }
    }
})

export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer;