import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users";
import urlReducer from "./urls";

const rootReducer = {
  users: userReducer,
  urls: urlReducer,
  // add reducers here
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
