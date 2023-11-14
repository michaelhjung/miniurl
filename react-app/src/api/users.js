import { api } from "./index";

export const fetchAllUsers = async () => {
  return api.get("/api/users/");
};

export const fetchUserById = async (id) => {
  return api.get(`/api/users/${id}`);
};

export const createUser = async (userData) => {
  return api.post("/api/users/", userData);
};

export const changeUserPassword = async (id, passwordData) => {
  return api.put(`/api/users/${id}/password`, passwordData);
};

export const updateUser = async (id, updatedData) => {
  return api.put(`/api/users/${id}`, updatedData);
};

export const deleteUser = async (id) => {
  return api.delete(`/api/users/${id}`);
};
