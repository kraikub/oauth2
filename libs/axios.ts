import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.API_URL,
};

const mykuConfig: AxiosRequestConfig = {
  baseURL: process.env.MYKU_AUTH_URL,
};

export const nextApiBaseInstance: AxiosInstance = axios.create(config);
export const mykuInstance: AxiosInstance = axios.create(mykuConfig);
