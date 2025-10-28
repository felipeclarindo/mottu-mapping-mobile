import React, { useState, useEffect } from "react";
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
import { LoginScreenNavigationProp } from "../../model/navigation";
import { login, getCurrentUser } from "../../service/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  // Verifica se já existe usuário logado
  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        navigation.navigate("drawer"); // já logado
      }
    };
    checkUser();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos Obrigatórios", "Preencha seu e-mail e senha.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Senha Inválida",
        "A senha deve ter pelo menos 6 caracteres."
      );
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      Alert.alert("Bem-vindo!", "Login realizado com sucesso!");
      setEmail("");
      setPassword("");
      navigation.navigate("drawer");
    } catch (error: any) {
      console.error("Erro no login:", error.code || error.message);
      let message = "Não foi possível realizar o login.";

      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/wrong-password":
          message = "E-mail ou senha incorretos.";
          break;
        case "auth/user-disabled":
          message = "Sua conta foi desativada.";
          break;
        case "auth/too-many-requests":
          message = "Muitas tentativas de login. Tente mais tarde.";
          break;
        case "auth/network-request-failed":
          message = "Erro de conexão. Verifique sua internet.";
          break;
      }

      Alert.alert("Erro de Login", message);
    } finally {
      setLoading(false);
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
          placeholder="E-mail"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
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
