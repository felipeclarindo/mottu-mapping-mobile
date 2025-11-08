import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import i18n, {
  onLanguageChange,
  changeLanguage as setI18nLanguage,
} from "../i18n/i18n";
import { useTheme } from "../context/ThemeContext";
import { settingsViewStyles } from "../theme/styles";

const SettingsPage = () => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState(i18n.locale);
  const { isDark, toggleTheme, colors } = useTheme();
  const styles = settingsViewStyles(colors);

  React.useEffect(() => {
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
    setI18nLanguage(lang);
    setLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Header
        title={t.settings.title}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title as any}>{t.settings.title}</Text>
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.settings?.theme || "Tema"}</Text>
          <TouchableOpacity
            style={[
              styles.languageButton,
              !isDark && styles.languageButtonActive,
            ]}
            onPress={toggleTheme}
          >
            <Text
              style={[
                styles.languageButtonText,
                !isDark && styles.languageButtonTextActive,
              ]}
            >
              {isDark
                ? `🌞 ${t.settings?.lightMode || "Modo Claro"}`
                : `🌙 ${t.settings?.darkMode || "Modo Escuro"}`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default SettingsPage;
