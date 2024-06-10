import { createSlice } from "@reduxjs/toolkit";
import { fetchOrderItems } from "../../hooks/fetchLocalStoreg";
const initialState = {
  orderItems: fetchOrderItems(),
};

export const order = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderItem: (state, action) => {
      state.orderItems = action.payload;
    },
  },
});
export const { setOrder, setOrderItem } = order.actions;
export default order.reducer;
