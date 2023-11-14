import { api } from "./index";

export const fetchCurrentUser = async () => api.get("/api/session/current");

export const loginUser = async (credentials) =>
  api.post("/api/session/login", credentials);

export const logoutUser = async () => api.post("/api/session/logout");
