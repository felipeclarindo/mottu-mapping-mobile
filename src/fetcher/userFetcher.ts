import axios from "axios";
import { LoginRequestDTO, LoginResponseDTO } from "../model/UserModel";
import { mottuMappingApi } from "./api";

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponseDTO> => {
  try {
    const payload: LoginRequestDTO = { username, password };
    const response = await mottuMappingApi.post<LoginResponseDTO>(
      `/login`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Erro ao fazer login";
  }
};
