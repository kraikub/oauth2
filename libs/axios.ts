import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const mykuConfig: AxiosRequestConfig = {
  baseURL: process.env.MYKU_AUTH_URL,
};

export const nextApiBaseInstance: AxiosInstance = axios.create();
export const mykuInstance: AxiosInstance = axios.create(mykuConfig);
