import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userApi from "../api/users";
import * as sessionApi from "../api/session";

// Asynchronous Thunks
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  userApi.fetchAllUsers
);
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  sessionApi.fetchCurrentUser
);
export const fetchUserById = createAsyncThunk("user/fetchUserById", (id) =>
  userApi.fetchUserById(id)
);
export const createUser = createAsyncThunk("user/createUser", (userData) =>
  userApi.createUser(userData)
);
export const updateUser = createAsyncThunk("user/updateUser", (userData) =>
  userApi.updateUser(userData)
);
export const changeUserPassword = createAsyncThunk(
  "user/changeUserPassword",
  (passwordData) => userApi.changeUserPassword(passwordData)
);
export const deleteUser = createAsyncThunk("user/deleteUser", (id) =>
  userApi.deleteUser(id)
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { dispatch }) => {
    const response = await sessionApi.loginUser(credentials);
    if (response) dispatch(fetchCurrentUser());
    return response;
  }
);
export const logout = createAsyncThunk("user/logout", sessionApi.logoutUser);

// Initial State
const initialState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

// User Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Any synchronous operations can go here, e.g., logoutUser

    // Sets the current user
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },

    // Clears the current user
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },

    // Clears any user-related errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        // state.currentUser = action.payload;
        // Do not directly set state.currentUser here
        // This will be set by fetchCurrentUser.fulfilled case
      })
      .addCase(login.rejected, (state, action) => {
        state.error = "Invalid credentials";
      })

      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null; // Clear the user upon logout
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { setUser, clearCurrentUser, clearErrors } = userSlice.actions;
