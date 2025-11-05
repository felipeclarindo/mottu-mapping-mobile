import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigation, DrawerActions, useFocusEffect } from "@react-navigation/native";
import { generateCompleteReport } from "../utils";
import useMotoControl from "../control/motoControl";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n"; 

const ReportPage = () => {
  const navigation = useNavigation();
  const { countMotosBySector } = useMotoControl();
  const [sectorCounts, setSectorCounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [relatorioCompleto, setRelatorioCompleto] = React.useState("");
  const [language, setLanguage] = React.useState(i18n.locale);

  React.useEffect(() => {
    // registra listener que atualiza o state quando o idioma muda
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

  //const t = i18n.translations[language] || i18n.translations.pt;

  const t = (key) => i18n.t(key);


  useFocusEffect(
    React.useCallback(() => {
      setLanguage(i18n.locale);
    }, [])
  );

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    countMotosBySector()
      .then((data) => {
        setSectorCounts(data ?? []);
        setRelatorioCompleto(generateCompleteReport(data ?? []));
      })
      .catch((e) => setError(e?.message || t("report.reportError")))
      .finally(() => setLoading(false));
  }, [language]);

  const shareReport = async () => {
    try {
      const fileUri = FileSystem.Paths.cache + "/relatorio_completo.txt";
      await FileSystem.writeAsStringAsync(fileUri, relatorioCompleto, {
        encoding: "utf8",
      });
      await Sharing.shareAsync(fileUri, {
        mimeType: "text/plain",
        dialogTitle: t("report.shareTitle"),
      });
    } catch (error) {
      Alert.alert(
        t("report.shareError"),
        `${t("report.shareErrorMessage")} ${error.message}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={t("report.title")}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t("report.fullReport")}</Text>
        {loading ? (
          <Text style={styles.relatorioTexto}>{t("report.loadingReport")        }</Text>
        ) : error ? (
          <Text style={[styles.relatorioTexto, { color: "red" }]}>{error}</Text>
        ) : (
          <View style={styles.card}>
            <Text style={styles.relatorioTexto}>{relatorioCompleto}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={shareReport}
          disabled={loading || !!error}
        >
          <Text style={styles.buttonText}>{t("report.shareReport")}</Text>
        </TouchableOpacity>
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1F1F1F",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#3A6E33",
  },
  relatorioTexto: {
    fontSize: 14,
    color: "#C7D6B9",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ReportPage;