import axios from "axios";
import * as SecureStore from "expo-secure-store";

import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.API_URL || "";
export const mottuMappingApi = axios.create({
  baseURL: API_URL,
});

mottuMappingApi.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("jwt_token");
  if (token && config.headers) {
    (config.headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${token}`;
    return config;
  }
});
