import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.API_URL,
};

export const nextApiBaseInstance: AxiosInstance = axios.create(config);
