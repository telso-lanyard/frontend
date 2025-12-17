import { StrictMode } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  QueryClient,
  QueryCache,
  MutationCache,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./index.scss";
import App from "./App.tsx";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);

        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data?.message || axiosError.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);

        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data?.message || axiosError.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  }),

  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401 || status === 403) return false;
        }

        return failureCount < 2;
      },
    },

    mutations: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
