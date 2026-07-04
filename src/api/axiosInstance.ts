import axios from "axios";
import { clearAuthSession } from "../utils/authStorage";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthSession();
    }

    const message =
      error?.response?.data?.message || error?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
