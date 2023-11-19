import { api } from "./index";

export const fetchAllUrls = async () => {
  return api.get("/api/urls/");
};

export const fetchAllUsersUrls = async (userId) => {
  return api.get(`/api/urls/users/${userId}`);
};

export const fetchUrlsById = async (id) => {
  return api.get(`/api/urls/${id}`);
};

export const createUrl = async (urlData) => {
  return api.post("/api/urls/", urlData);
};

export const updateUrl = async (id, updatedData) => {
  return api.put(`/api/urls/${id}`, updatedData);
};

export const deleteUrl = async (id) => {
  return api.delete(`/api/urls/${id}`);
};
