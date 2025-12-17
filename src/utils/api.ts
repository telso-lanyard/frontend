import axios from "axios";

import urls from "./urls";

const api = axios.create({
  baseURL: urls.api,
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message;

    if (
      message === "Access Denied. No token provided." ||
      message === "Token has expired."
    ) {
      error.response.data.message = "Session expired. Please log in again.";
      sessionStorage.removeItem("token");

      setTimeout(() => {
        if (window.location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/auth";
        } else if (window.location.pathname.startsWith("/demo/admin")) {
          window.location.href = "/demo/admin/auth";
        } else if (window.location.pathname.startsWith("/business/admin")) {
          window.location.href = "/business/admin/auth";
        }
      }, 3000);
    }

    return Promise.reject(error);
  }
);

export default api;
