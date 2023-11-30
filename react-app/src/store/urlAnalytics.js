import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as urlAnalyticsApi from "../api/urlAnalytics";

// Asynchronous Thunks
export const fetchAllUrlAnalyticsByUrlId = createAsyncThunk(
  "urlAnalytics/fetchAllUrlAnalyticsByUrlId",
  (id) => urlAnalyticsApi.fetchAllUrlAnalyticsByUrlId(id)
);

// Initial State
const initialState = {
  urlAnalytics: null,
  loading: false,
  error: null,
};

// URL Analytics Slice
const urlAnalyticsSlice = createSlice({
  name: "urlAnalytics",
  initialState,
  reducers: {
    // Any synchronous operations can go here

    // Clears any URL analytics-related errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUrlAnalyticsByUrlId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUrlAnalyticsByUrlId.fulfilled, (state, action) => {
        state.loading = false;
        state.urlAnalytics = action.payload;
      })
      .addCase(fetchAllUrlAnalyticsByUrlId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default urlAnalyticsSlice.reducer;
export const { clearErrors } = urlAnalyticsSlice.actions;
