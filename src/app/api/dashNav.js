import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shape: false,
};

export const openShap = createSlice({
  name: "shape",
  initialState,
  reducers: {
    opShape: (state, action) => {
      state.shape = action.payload;
    },
  },
});

export const { opShape } = openShap.actions;

export default openShap.reducer;
