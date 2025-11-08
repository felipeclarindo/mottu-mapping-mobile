import { useState } from "react";
import { userService } from "../service/userService";

export const useUserControl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.login(username, password);
      return data;
    } catch (e: any) {
      setError(e?.message || "Erro ao fazer login");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
