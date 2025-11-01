import axios from "axios";
import { LoginRequestDTO, LoginResponseDTO } from "../model/UserModel";
import Constants from "expo-constants";

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponseDTO> => {
  try {
    const payload: LoginRequestDTO = { username, password };
    const API_URL = Constants.expoConfig?.extra?.API_URL || "";
    const response = await axios.post<LoginResponseDTO>(
      `${API_URL}/login`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Erro ao fazer login";
  }
};
