import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restaurantCollectionService from "./restaurantCollectionService";

const initialState = {
  restaurantCollections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add restaurant to collection
export const addToRestaurantCollection = createAsyncThunk(
  "restaurantCollections/add",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await restaurantCollectionService.addToRestaurantCollection(
        data,
        token
      );
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

// Get all user restaurant collections
export const getRestaurantCollections = createAsyncThunk(
  "restaurantCollections/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await restaurantCollectionService.getRestaurantCollections(token);
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

// Delete restaurant from collection
export const deleteFromRestaurantCollection = createAsyncThunk(
  "restaurantCollections/delete",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await restaurantCollectionService.deleteFromRestaurantCollection(
        data,
        token
      );
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

export const restaurantCollectionSlice = createSlice({
  name: "restaurantCollection",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToRestaurantCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToRestaurantCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.restaurantCollections.push(action.payload);
      })
      .addCase(addToRestaurantCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getRestaurantCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestaurantCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.restaurantCollections = action.payload;
      })
      .addCase(getRestaurantCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteFromRestaurantCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFromRestaurantCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.restaurantCollections = state.restaurantCollections.filter(
          (restaurantCollection) =>
            restaurantCollection.collection_id !==
              action.payload.collectionId ||
            restaurantCollection.restaurant_id !== action.payload.restaurantId
        );
      })
      .addCase(deleteFromRestaurantCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = restaurantCollectionSlice.actions;
export default restaurantCollectionSlice.reducer;
