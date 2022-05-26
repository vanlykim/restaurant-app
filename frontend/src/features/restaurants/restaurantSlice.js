import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restaurantService from "./restaurantService";

const initialState = {
  restaurants: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user restaurants
export const getRestaurants = createAsyncThunk(
  "restaurants/getAll",
  async (restaurantData, thunkAPI) => {
    try {
      return await restaurantService.getRestaurants(restaurantData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.restaurants = action.payload;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = restaurantSlice.actions;
export default restaurantSlice.reducer;
