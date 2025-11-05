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
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../model/navigation";

import { User } from "../model/UserModel";
import { useUserControl } from "../control/userControl";
import { useAuth } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store";
import i18n, { changeLanguage } from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n"; 

const LoginPage = () => {
  const [user, setUser] = useState<User>({
    idUser: null,
    username: "",
    password: "",
  });

  const { login, loading } = useUserControl();
  const { setUser: setAuthUser } = useAuth();

  const navigation = useNavigation<LoginScreenNavigationProp>();

  // estado local para idioma atual
  const [lang, setLang] = useState(i18n.locale);

  React.useEffect(() => {
    // registra listener que atualiza o state quando o idioma muda
    const unsubscribe = onLanguageChange(() => setLang(i18n.locale));
    return unsubscribe;
  }, []);

  const t = i18n.translations[i18n.locale] || i18n.translations.pt;

  const handleLogin = async () => {
    if (!user.username || !user.password) {
      Alert.alert(t.login.requiredFields, t.login.fillFields);
      return;
    }
    if (user.password.length < 6) {
      Alert.alert(t.login.invalidPassword, t.login.passwordLength);
      return;
    }
    try {
      const resp = await login(user.username, user.password);
      await SecureStore.setItemAsync("jwt_token", resp.token);
      setAuthUser({
        idUser: null,
        username: resp.username,
        password: "",
      });
      Alert.alert(t.login.welcome, t.login.loginSuccess);
      setUser({ idUser: null, username: "", password: "" });
      navigation.navigate("drawer");
    } catch (e: any) {
      let message =
        typeof e === "string" ? e : e?.message || t.login.loginFailed;
      Alert.alert(t.login.loginError, message);
    }
  };

  const toggleLanguage = () => {
    const newLang = lang === "pt" ? "es" : "pt";
    changeLanguage(newLang);
    setLang(newLang);
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
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>{t.login.title}</Text>

        <TextInput
          placeholder={t.login.username}
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
          placeholder={t.login.password}
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
            <Text style={styles.buttonText}>{t.login.loginButton}</Text>
          )}
        </TouchableOpacity>

        {/* Botão para trocar idioma */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={toggleLanguage}>
            <Text style={styles.langButton}>
              {lang === "pt" ? "🇪🇸 Mudar para Espanhol" : "🇧🇷 Cambiar a Portugués"}
            </Text>
          </TouchableOpacity>
        </View>
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
  langButton: {
    color: "#54C65B",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default LoginPage;