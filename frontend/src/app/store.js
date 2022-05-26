import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import restaurantReducer from "../features/restaurants/restaurantSlice";
import collectionReducer from "../features/collections/collectionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantReducer,
    collections: collectionReducer,
  },
});
