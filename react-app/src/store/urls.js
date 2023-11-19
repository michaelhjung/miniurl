import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as urlApi from "../api/urls";

// Asynchronous Thunks
export const fetchAllUrls = createAsyncThunk(
  "url/fetchAllUrls",
  urlApi.fetchAllUrls
);
export const fetchAllUsersUrls = createAsyncThunk(
  "url/fetchAllUsersUrls",
  (userId) => urlApi.fetchAllUsersUrls(userId)
);
export const fetchUrlById = createAsyncThunk("url/fetchUrlById", (id) =>
  urlApi.fetchUrlsById(id)
);
export const createUrl = createAsyncThunk("url/createUrl", (urlData) =>
  urlApi.createUrl(urlData)
);
export const updateUrl = createAsyncThunk("url/updateUrl", (data) =>
  urlApi.updateUrl(data.id, data.updatedData)
);
export const deleteUrl = createAsyncThunk("url/deleteUrl", (id) =>
  urlApi.deleteUrl(id)
);

// Initial State
const initialState = {
  urls: [],
  loading: false,
  error: null,
};

// URL Slice
const urlSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    // Any synchronous operations can go here

    // Clears any URL-related errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUrls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(fetchAllUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAllUsersUrls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsersUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(fetchAllUsersUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUrlById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUrlById.fulfilled, (state, action) => {
        state.loading = false;
        const existingIndex = state.urls.findIndex(
          (url) => url.id === action.payload.id
        );
        if (existingIndex !== -1) {
          state.urls[existingIndex] = action.payload;
        } else {
          state.urls.push(action.payload);
        }
      })
      .addCase(fetchUrlById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls.push(action.payload);
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUrl.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.urls.findIndex(
          (url) => url.id === action.payload.id
        );
        if (index !== -1) {
          state.urls[index] = action.payload;
        }
      })
      .addCase(updateUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteUrl.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = state.urls.filter((url) => url.id !== action.meta.arg);
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default urlSlice.reducer;
export const { clearErrors } = urlSlice.actions;
