import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  blood: ''
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data.push(action.payload)
    },
    setBlood: (state, action) => {
      console.log(action.payload)
      state.blood = action.payload
    }
  },
});

export const { setData, setBlood } = dataSlice.actions;

export default dataSlice.reducer;
