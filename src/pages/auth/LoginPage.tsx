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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }: any) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!user || !password) {
      Alert.alert("Atenção", "Preencha e-mail e Password.");
      return;
    }
    const userData = { user, email: "teste@gmail.com" };
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      navigation.navigate("home");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
      console.error(err);
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
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
          value={user}
          onChangeText={setUser}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
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
  content: { padding: 20, flexGrow: 1, justifyContent: "center" },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#A3E635",
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
    color: "#A3E635",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default LoginPage;
