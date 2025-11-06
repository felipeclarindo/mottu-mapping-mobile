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
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";
import { generateCompleteReport } from "../utils";
import useMotoControl from "../control/motoControl";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n";
import { useTheme } from "../context/ThemeContext";
import { reportViewStyles } from "../theme/styles";

const ReportPage = () => {
  const navigation = useNavigation();
  const { countMotosBySector } = useMotoControl();
  const [sectorCounts, setSectorCounts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [relatorioCompleto, setRelatorioCompleto] = React.useState("");
  const [language, setLanguage] = React.useState(i18n.locale);

  React.useEffect(() => {
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

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

  // const shareReport = async () => {
  //   try {
  //     const cacheDir = (FileSystem as any).cacheDirectory ?? "";
  //     const fileUri = cacheDir + "relatorio_completo.txt";
  //     const writeFn =
  //       (FileSystem as any).writeAsStringAsync ??
  //       (await import("expo-file-system/legacy")).writeAsStringAsync;
  //     await writeFn(fileUri, relatorioCompleto, { encoding: "utf8" });
  //     await Sharing.shareAsync(fileUri, {
  //       mimeType: "text/plain",
  //       dialogTitle: t("report.shareTitle"),
  //     });
  //   } catch (error) {
  //     Alert.alert(
  //       t("report.shareError"),
  //       `${t("report.shareErrorMessage")} ${error.message}`
  //     );
  //   }
  // };

  const { colors } = useTheme();
  const styles = reportViewStyles(colors);
  return (
    <View style={styles.container}>
      <Header
        title={t("report.title")}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t("report.fullReport")}</Text>
        {loading ? (
          <Text style={styles.relatorioTexto}>{t("report.loadingReport")}</Text>
        ) : error ? (
          <Text style={[styles.relatorioTexto, { color: "red" }]}>{error}</Text>
        ) : (
          <View style={styles.card}>
            <Text style={styles.relatorioTexto}>{relatorioCompleto}</Text>
          </View>
        )}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={shareReport}
          disabled={loading || !!error}
        >
          <Text style={styles.buttonText}>{t("report.shareReport")}</Text>
        </TouchableOpacity> */}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ReportPage;
