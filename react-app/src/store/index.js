import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users";

const rootReducer = {
  users: userReducer,
  // add reducers here
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
