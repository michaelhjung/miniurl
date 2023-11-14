export const baseURL = process.env.REACT_APP_BASE_URL;

// A helper function to handle responses
export const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Something went wrong");
  }
  return response.json();
};

// A helper function to get CSRF token from cookies
export const getCSRFToken = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].trim().split("=");
    if (cookieName === "csrf_") {
      return cookieValue;
    }
  }
  return null;
};

// A helper function to include CSRF token for certain requests
export const getHeaders = (method) => {
  const isStateChanging = ["POST", "PUT", "DELETE"].includes(method);
  return {
    "Content-Type": "application/json",
    ...(isStateChanging && { "X-Csrf-Token": getCSRFToken() }),
    //... other headers if necessary
  };
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
      headers: getHeaders("GET"),
      credentials: "include",
    });
    return handleResponse(response);
  },

  post: async (endpoint, body) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "POST",
      headers: getHeaders("POST"),
      credentials: "include",
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  put: async (endpoint, body) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "PUT",
      headers: getHeaders("PUT"),
      credentials: "include",
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: "DELETE",
      headers: getHeaders("DELETE"),
      credentials: "include",
    });
    return handleResponse(response);
  },
};
