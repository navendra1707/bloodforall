import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId:'',
    user:{}
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserId: (state,action)=>{
            state.userId = action.payload
        },
        setUser: (state,action)=>{
            state.user = action.payload
        }
    }
})

export const {setUserId,setUser} = authSlice.actions;

export default authSlice.reducer;