import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import restaurantReducer from "../features/restaurants/restaurantSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantReducer,
  },
});
