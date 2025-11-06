import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import ImageModal from "../components/ImageModal";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BarChart } from "react-native-chart-kit";
import Separator from "../components/Separator";
import { HomeScreenNavigationProp } from "../model/navigation";
import { motoService } from "../service/motoService";
import { CountSectorDTO } from "../model/MotoModel";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n";
import { useTheme } from "../context/ThemeContext";
import { homeViewStyles } from "../theme/styles";

const getChartConfig = (colors: any) => ({
  backgroundGradientFrom: colors.background,
  backgroundGradientTo: colors.background,
  color: (opacity = 1) =>
    colors.primary + Math.floor(opacity * 255).toString(16),
  labelColor: () => colors.text,
  barPercentage: 1.0,
  decimalPlaces: 0,
});

const HomePage = () => {
  const { colors } = useTheme();
  const styles = homeViewStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [showRelatorioButtons, setShowRelatorioButtons] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagemSource, setImagemSource] = useState<number | null>(null);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [sectorCounts, setSectorCounts] = useState<CountSectorDTO[]>([]);
  const [sectorLoading, setSectorLoading] = useState(false);
  const [sectorError, setSectorError] = useState<string | null>(null);

  const [language, setLanguage] = useState(i18n.locale);

  React.useEffect(() => {
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

  const t = i18n.translations[language] || i18n.translations.pt;

  useFocusEffect(
    useCallback(() => {
      setLanguage(i18n.locale);
      setSectorLoading(true);
      setSectorError(null);
      motoService
        .countMotosBySector()
        .then((data) => setSectorCounts(data ?? []))
        .catch((e) => setSectorError(e?.message || t.home.chartError))
        .finally(() => setSectorLoading(false));
    }, [i18n.locale])
  );

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, "");

  const labels = sectorCounts.map((s) => {
    const key = normalize(s.sectorName);
    return t.home?.sectors?.[key] || t.patio?.sectors?.[key] || s.sectorName;
  });
  const values = sectorCounts.map((s) => s.motoCount);

  const showImage = () => {
    setLoading(true);
    setShowRelatorioButtons(false);
    setTimeout(() => {
      setImagemSource(require("../assets/patio.png"));
      setShowRelatorioButtons(true);
      setLoading(false);
      setModalVisible(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleRedirectToPatio = () => navigation.navigate("patio");
  const handleRedirectToReport = () => navigation.navigate("report");

  return (
    <View style={styles.container}>
      <Header
        title="Home"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t.home.title}</Text>
        <Text style={styles.title}>{t.home.address}</Text>

        <Text style={styles.subtitle}>{t.home.subtitle}</Text>
        {sectorLoading ? (
          <ActivityIndicator
            color={colors.primary}
            style={styles.loadingContainer}
          />
        ) : sectorError ? (
          <Text style={styles.loadingText}>{sectorError}</Text>
        ) : (
          <>
            <BarChart
              data={{ labels, datasets: [{ data: values }] }}
              width={Dimensions.get("window").width - 40}
              height={220}
              chartConfig={getChartConfig(colors)}
              style={styles.chart}
              fromZero
              yAxisLabel=""
              yAxisSuffix=""
            />
            <View style={styles.buttonsContainer}>
              {sectorCounts.map((s) => {
                const key = normalize(s.sectorName);
                const translated =
                  t.home?.sectors?.[key] ||
                  t.patio?.sectors?.[key] ||
                  s.sectorName;
                return (
                  <View key={s.sectorName} style={styles.button}>
                    <Text style={styles.buttonText}>{translated}</Text>
                    <Text style={styles.buttonText}>{s.motoCount}</Text>
                  </View>
                );
              })}
            </View>
          </>
        )}

        <Separator />

        <Text style={styles.subtitle}>{t.home.description}</Text>

        <Pressable
          onPress={showImage}
          disabled={loading}
          style={({ pressed }) => [
            styles.mainButton,
            pressed && { opacity: 0.8 },
            loading && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.mainButtonText}>{t.home.showImage}</Text>
        </Pressable>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>{t.home.loading}</Text>
          </View>
        )}

        {imagemSource !== null && (
          <ImageModal
            visible={modalVisible}
            onClose={handleCloseModal}
            imageSource={imagemSource}
          />
        )}

        {showRelatorioButtons && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleRedirectToReport}
            >
              <Text style={styles.buttonText}>{t.home.report}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleRedirectToPatio}
            >
              <Text style={styles.buttonText}>{t.home.patio}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Footer />
    </View>
  );
};

export default HomePage;
