import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const mottuMappingApi = axios.create({
  baseURL: API_URL,
});
