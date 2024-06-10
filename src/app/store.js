import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../components/auth/authSlice";
import openShap from "./api/dashNav";
import openproOver from "./api/productOverlay";
import cartReducer from "./api/cartSlice";
import orderReducer from "./api/orSlise";
import tranReducer from "./api/tran";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    shape: openShap,
    proOver: openproOver,
    cart: cartReducer,
    order: orderReducer,
    tran: tranReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});
