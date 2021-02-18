import axios, {AxiosRequestConfig} from "axios";

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3333/',
  timeout: 10000,
  responseType: 'json',
};

const axiosConfig = axios.create(config);

export default axiosConfig;
