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
import { useTheme } from "../context/ThemeContext";
import { loginViewStyles } from "../theme/styles";

const LoginPage = () => {
  const { colors } = useTheme();
  const styles = loginViewStyles(colors);
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState(i18n.locale);
  const t = i18n.translations[lang] || i18n.translations.pt;
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useUserControl();
  const { setUser: setAuthUser } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await login(user.username, user.password);
      await SecureStore.setItemAsync("jwt_token", res.token);
      setAuthUser({
        username: (res as any).username ?? (res as any).user?.username ?? "",
        idUser:
          (res as any).idUser ??
          (res as any).id ??
          (res as any).userId ??
          (res as any).user?.id ??
          "",
      });

      navigation.reset({ index: 0, routes: [{ name: "drawer" }] });
    } catch (e: any) {
      setError(e?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    const next = lang === "pt" ? "es" : "pt";
    i18n.locale = next;
    setLang(next);
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

        <Text style={styles.title}>{t.login?.title || "Login"}</Text>

        <TextInput
          placeholder={t.login?.username || "Usuário"}
          placeholderTextColor={colors.text}
          style={styles.input}
          autoCapitalize="none"
          value={user.username}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, username: text }))
          }
          editable={!loading}
        />
        <TextInput
          placeholder={t.login?.password || "Senha"}
          placeholderTextColor={colors.text}
          style={styles.input}
          secureTextEntry
          value={user.password}
          onChangeText={(text) =>
            setUser((prev) => ({ ...prev, password: text }))
          }
          editable={!loading}
        />

        {error && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 12 }}>
            {error}
          </Text>
        )}
        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={styles.buttonText}>
              {t.login?.loginButton || "Entrar"}
            </Text>
          )}
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={toggleLanguage}>
            <Text style={styles.langButton}>
              {lang === "pt"
                ? "🇪🇸 Mudar para Espanhol"
                : "🇧🇷 Cambiar a Português"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
