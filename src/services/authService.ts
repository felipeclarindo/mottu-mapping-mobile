import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Faz login e salva usuário no AsyncStorage
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Salva usuário no AsyncStorage
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
      })
    );

    return user;
  } catch (error: any) {
    throw error;
  }
};

// Faz registro
export const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw error;
  }
};

// Faz logout e remove usuário do AsyncStorage
export const logout = async () => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem("user");
  } catch (error: any) {
    throw error;
  }
};

// Retorna o usuário logado do AsyncStorage
export const getCurrentUser = async () => {
  const userStr = await AsyncStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Função para atualizar o nome do usuário no Firebase
export const updateUserName = async (user: any, name: string) => {
  await updateProfile(user, { displayName: name });
  return user;
};
