import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // <-- NOVO IMPORT
// O updateUserName deve estar disponível no seu authService após o ajuste acima.
//import { register, updateUserName } from "../../service/authService"; // <-- IMPORT ATUALIZADO

const RegisterPage = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRedirectToLogin = () => {
    navigation.navigate("login");
  };

  const handleRegister = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // --- Validação básica de formulário ---
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos.");
      return;
    }

    // --- Requisito de Segurança do Firebase ---
    if (trimmedPassword.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    // ------------------------------------------

    setLoading(true);

    try {
      // 1. Chama a função de registro e recebe o objeto User do Firebase
      let user = await register(trimmedEmail, trimmedPassword);

      // 2. Atualiza o perfil do Firebase com o nome
      await updateUserName(user, trimmedName);

      // 3. Salva os dados do usuário no AsyncStorage (CHAVE PARA O HOMEPAGE)
      const userData = {
        uid: user.uid,
        email: user.email,
        name: trimmedName, // Salva o nome para exibição
      };
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso! Faça login para continuar."
      );

      // Limpa os campos
      setName("");
      setEmail("");
      setPassword("");

      // Redireciona para login após o cadastro
      navigation.navigate("login");
    } catch (error: any) {
      console.error("Erro no registro:", error.code || error.message);
      let message = "Não foi possível criar a conta. Tente novamente.";

      // Mapeamento de erros comuns do Firebase
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Este e-mail já está em uso por outra conta.";
          break;
        case "auth/invalid-email":
          message = "O formato do e-mail é inválido.";
          break;
        case "auth/operation-not-allowed":
          message = "O login por e-mail/senha não está habilitado no Firebase.";
          break;
        default:
          message =
            "Erro de conexão. Verifique sua chave de API do Firebase ou tente novamente.";
          break;
      }

      Alert.alert("Erro", message);
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

        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#888"
          style={styles.input}
          value={name}
          onChangeText={setName}
          editable={!loading}
        />
        <TextInput
          placeholder="Email"
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
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#121212" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Já tem conta?{" "}
          <Text style={styles.linkText} onPress={handleRedirectToLogin}>
            Faça login
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ... estilos (styles) permanecem inalterados ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
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
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "700",
  },
  footerText: {
    textAlign: "center",
    color: "#C7D6B9",
    fontSize: 14,
  },
  linkText: {
    color: "#54C65B",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  logo: {
    width: 250,
    height: 200,
    alignSelf: "center",
    marginBottom: 40,
  },
});

export default RegisterPage;
