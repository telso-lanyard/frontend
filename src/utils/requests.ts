import axios, { type AxiosRequestConfig } from "axios";

import urls from "./urls";

interface RequestOptions {
  url_mod?: string;
  query?: Record<string, any>;
  body?: Record<string, any>;
  token?: string;
  files?: File[];
}

const api = axios.create({
  baseURL: urls.api,
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

const Request = {
  get: async ({ url_mod = "", query, token }: RequestOptions) => {
    const config: AxiosRequestConfig = {
      params: query,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
    return api.get(url_mod, config);
  },

  post: async ({ url_mod = "", query, body, token }: RequestOptions) => {
    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        ...(body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    return api.post(url_mod, body, config);
  },

  patch: async ({ url_mod = "", query, body, token }: RequestOptions) => {
    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    return api.patch(url_mod, body, config);
  },

  delete: async ({ url_mod = "", query, token }: RequestOptions) => {
    const config: AxiosRequestConfig = {
      params: query,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
    return api.delete(url_mod, config);
  },
};

export default Request;