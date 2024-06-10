import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proOver: false,
  proId: "",
};

export const openproOver = createSlice({
  name: "overlay",
  initialState,
  reducers: {
    opOver: (state, action) => {
      state.proOver = action.payload;
    },
    setProId: (state, action) => {
      state.proId = action.payload;
    },
  },
});

export const { opOver, setProId } = openproOver.actions;

export default openproOver.reducer;
