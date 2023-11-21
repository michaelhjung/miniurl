import { api } from "./index";

export const redirectToOriginalUrl = async (shortUrlToken) => {
  return api.get(`/api/redirects/${shortUrlToken}`);
};
