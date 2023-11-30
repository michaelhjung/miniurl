// api/urlAnalytics.js
import { api } from "./index";

export const fetchAllUrlAnalyticsByUrlId = async (urlId) => {
  return api.get(`/api/urls/${urlId}/url-analytics`);
};
