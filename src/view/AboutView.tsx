import React from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n";
import { useTheme } from "../context/ThemeContext";
import { reportViewStyles } from "../theme/styles";
import { COMMIT_HASH } from "../../scripts/commit";

const AboutView: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = reportViewStyles(colors);
  const [language, setLanguage] = React.useState(i18n.locale);

  React.useEffect(() => {
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

  const t = (key: string) => i18n.t(key);

  useFocusEffect(
    React.useCallback(() => {
      setLanguage(i18n.locale);
    }, [])
  );

  let appName = "MottuMapping";
  let appVersion = "1.0.0";
  try {
    const appJson = require("../../app.json");
    if (appJson?.expo?.name) appName = appJson.expo.name;
    if (appJson?.expo?.version) appVersion = appJson.expo.version;
  } catch (e) {
  }

  return (
    <View style={styles.container}>
      <Header
        title={t("drawer.about")}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title as any}>{t("drawer.about")}</Text>

        <View style={styles.card}>
          <Text style={{ color: colors.text, fontSize: 16, marginBottom: 8 }}>
            {appName} v{appVersion}
          </Text>
          <Text style={{ color: colors.text, fontSize: 14, marginBottom: 8 }}>
            {"MottuMapping - Aplicativo de mapeamento de pátio de motos."}
          </Text>
          <Text style={{ color: colors.text, fontSize: 12 }}>
            {"Commit hash: " + COMMIT_HASH}
          </Text>
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
};

export default AboutView;
