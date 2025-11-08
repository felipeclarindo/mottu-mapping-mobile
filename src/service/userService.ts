import { loginUser } from "../fetcher/userFetcher";
import { LoginResponseDTO } from "../model/UserModel";

export const userService = {
  login: async (
    username: string,
    password: string
  ): Promise<LoginResponseDTO> => {
    return await loginUser(username, password);
  },
};
