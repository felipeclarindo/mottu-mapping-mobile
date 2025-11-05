import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { DrawerActions, useNavigation, useFocusEffect } from "@react-navigation/native";
import { AccountScreenNavigationProp } from "../model/navigation";
import { useAuth } from "../context/AuthContext";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n"; 

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const [language, setLanguage] = useState(i18n.locale);

  React.useEffect(() => {
    // registra listener que atualiza o state quando o idioma muda
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

  const t = i18n.translations[language] || i18n.translations.pt;

  useFocusEffect(
    React.useCallback(() => {
      setLanguage(i18n.locale);
    }, [])
  );

  const handleLogout = () => {
    Alert.alert(t.account.logout, t.account.logoutConfirm, [
      { text: t.account.cancel, style: "cancel" },
      {
        text: t.account.logout,
        style: "destructive",
        onPress: async () => {
          await logout();
          navigation.reset({ index: 0, routes: [{ name: "login" }] });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header
        title={t.account.title}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t.account.accountInfo}</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/profile-generic.jpg")}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.profileName}>{user?.username || t.account.user}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>{t.account.logout}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: "#333",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#54C65B",
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#54C65B",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#1F1F1F",
    borderColor: "#3A6E33",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#C7D6B9",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginTop: 4,
  },
  buttonGroup: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#D9534F",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default AccountPage;