import axios from "axios";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const axiosInstance = axios.create({
  baseURL: serverRuntimeConfig.BASE_URL,
  headers: {
    "x-api-key": serverRuntimeConfig.API_KEY,
  },
});

export default axiosInstance;
