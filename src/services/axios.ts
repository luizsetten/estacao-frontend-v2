import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.API_URL,
  timeout: 10000,
  responseType: 'json',
};

const axiosConfig = axios(config).then((response) => response).catch((error) => error);

export default axiosConfig;
