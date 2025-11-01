import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../model/navigation";

import { User } from "../model/UserModel";
import { useUserControl } from "../control/userControl";
import * as SecureStore from "expo-secure-store";

const LoginPage = () => {
  const [user, setUser] = useState<User>({
    idUser: null,
    username: "",
    password: "",
  });
  const { login, loading, error } = useUserControl();

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!user.username || !user.password) {
      Alert.alert("Campos Obrigatórios", "Preencha seu usuário e senha.");
      return;
    }
    if (user.password.length < 6) {
      Alert.alert(
        "Senha Inválida",
        "A senha deve ter pelo menos 6 caracteres."
      );
      return;
    }
    try {
      const resp = await login(user.username, user.password);
      await SecureStore.setItemAsync("jwt_token", resp.token);
      Alert.alert("Bem-vindo!", `Login realizado!`);
      setUser({ idUser: null, username: "", password: "" });
      navigation.navigate("drawer");
    } catch (e: any) {
      let message =
        typeof e === "string"
          ? e
          : e?.message || "Não foi possível realizar o login.";
      Alert.alert("Erro de Login", message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Usuário"
          placeholderTextColor="#888"
          style={styles.input}
          autoCapitalize="none"
          value={user.username}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, username: text }))
          }
          editable={!loading}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={user.password}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, password: text }))
          }
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#121212" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não tem conta?{" "}
          <Text
            onPress={() => navigation.navigate("register")}
            style={styles.linkText}
          >
            Cadastre-se
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 45,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#54C65B",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    height: 50,
    backgroundColor: "#1F1F1F",
    borderColor: "#3A6E33",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "700" },
  footerText: { textAlign: "center", color: "#C7D6B9", fontSize: 14 },
  linkText: {
    color: "#54C65B",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  logo: { width: 250, height: 200, alignSelf: "center", marginBottom: 40 },
});

export default LoginPage;
