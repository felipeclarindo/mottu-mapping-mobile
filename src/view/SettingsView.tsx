import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DrawerActions, useNavigation, useFocusEffect } from "@react-navigation/native";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n"; 


const SettingsPage = () => {
  const navigation = useNavigation();
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

  const changeLanguage = (lang: "pt" | "es") => {
    i18n.locale = lang;
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Header
        title={t.settings.title}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t.settings.title}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings.language}</Text>
          
          <TouchableOpacity
            style={[
              styles.languageButton,
              language === "pt" && styles.languageButtonActive,
            ]}
            onPress={() => changeLanguage("pt")}
          >
            <Text
              style={[
                styles.languageButtonText,
                language === "pt" && styles.languageButtonTextActive,
              ]}
            >
              🇧🇷 {t.settings.portuguese}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.languageButton,
              language === "es" && styles.languageButtonActive,
            ]}
            onPress={() => changeLanguage("es")}
          >
            <Text
              style={[
                styles.languageButtonText,
                language === "es" && styles.languageButtonTextActive,
              ]}
            >
              🇪🇸 {t.settings.spanish}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 32,
  },
  section: {
    backgroundColor: "#1F1F1F",
    borderColor: "#3A6E33",
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#C7D6B9",
    marginBottom: 16,
  },
  languageButton: {
    backgroundColor: "#2A2A2A",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  languageButtonActive: {
    backgroundColor: "#3A6E33",
    borderColor: "#54C65B",
  },
  languageButtonText: {
    color: "#C7D6B9",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  languageButtonTextActive: {
    color: "#FFFFFF",
  },
});

export default SettingsPage;