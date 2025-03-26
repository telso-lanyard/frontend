import axios, { AxiosRequestConfig } from "axios";
import urls from "./urls";

interface RequestOptions {
  url_mod?: string;
  query?: Record<string, any>;
  body?: Record<string, any>;
  token?: string;
  files?: File[];
}

const Request = {
  get: async ({ url_mod = "", query, token }: RequestOptions) => {
    const config: AxiosRequestConfig = {
      params: query,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
    return axios.get(`${urls.apiURL}${url_mod}`, config);
  },

  post: async ({ url_mod = "", query, body, token, files }: RequestOptions) => {
    const formData = new FormData();

    if (files) {
      files.forEach((file, _) => {
        formData.append("media", file);
      });
    }

    if (body) {
      Object.entries(body).forEach(([key, value]) => {
        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
    }

    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    return axios.post(`${urls.apiURL}${url_mod}`, formData, config);
  },

  patch: async ({
    url_mod = "",
    query,
    body,
    token,
    files,
  }: RequestOptions) => {
    const formData = new FormData();

    if (files) {
      files.forEach((file, _) => {
        formData.append("media", file);
      });
    }

    if (body) {
      Object.entries(body).forEach(([key, value]) => {
        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
    }

    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    return axios.patch(`${urls.apiURL}${url_mod}`, formData, config);
  },

  delete: async ({ url_mod = "", query, token }: RequestOptions) => {
    const config: AxiosRequestConfig = {
      params: query,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
    return axios.delete(`${urls.apiURL}${url_mod}`, config);
  },
};

export default Request;
