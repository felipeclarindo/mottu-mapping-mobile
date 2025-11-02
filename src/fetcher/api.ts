import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const mottuMappingApi = axios.create({
  baseURL: "https://mottu-mapping-restful-4demo.onrender.com/",
});

mottuMappingApi.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("jwt_token");
  if (token && config.headers) {
    (config.headers as Record<string, string>)[
      "Authorization"
    ] = `Bearer ${token}`;
  }
  return config;
});
