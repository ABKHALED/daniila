import { createSlice } from "@reduxjs/toolkit";
import { fetchCartItems } from "../../hooks/fetchLocalStoreg";
const initialState = {
  cartShow: true,
  cartItems: fetchCartItems(),
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartShow = action.payload;
    },

    setCartItem: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});
export const { setCart, setCartItem } = cart.actions;
export default cart.reducer;
