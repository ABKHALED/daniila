import { createSlice } from "@reduxjs/toolkit";
import { fetchTran } from "../../hooks/fetchLocalStoreg";

const initialState = {
  tran: fetchTran(),
};

export const tran = createSlice({
  name: "tran",
  initialState,
  reducers: {
    setTrean: (state, action) => {
      state.tran = action.payload;
    },
  },
});

export const { setTrean } = tran.actions;

export default tran.reducer;
