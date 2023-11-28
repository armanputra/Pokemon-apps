import axios from "axios";

const axiosWithConfig = axios.create();

let bearerToken = "";

export const setAxiosConfig = (token: string) => {
  bearerToken = token;
  axiosWithConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

axiosWithConfig.interceptors.request.use((config) => {
  config.baseURL = process.env.REACT_APP_BASE_URL; 
  config.headers.Authorization = `Bearer ${bearerToken}`;
  return config;
});

export default axiosWithConfig;
