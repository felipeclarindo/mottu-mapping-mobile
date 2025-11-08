import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MotoModal from "../components/MotoModal";
import MotoCard from "../components/MotoCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";
import useMotoControl from "../control/motoControl";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n";
import { useTheme } from "../context/ThemeContext";
import { patioViewStyles } from "../theme/styles";

const PatioPage = () => {
  const navigation = useNavigation();
  const { motos, loading, error, loadMotos, hasMore, deleteMoto } =
    useMotoControl();
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const isFirstLoad = useRef(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMoto, setEditingMoto] = useState(null);
  const [language, setLanguage] = useState(i18n.locale);

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

  React.useEffect(() => {
    if (isFirstLoad.current) {
      setInitialLoading(true);
      loadMotos(true).finally(() => {
        setInitialLoading(false);
        isFirstLoad.current = false;
      });
    }
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !initialLoading) {
      setLoadingMore(true);
      loadMotos().finally(() => setLoadingMore(false));
    }
  };

  const handleOpenModal = () => {
    setEditingMoto(null);
    setModalOpen(true);
  };
  const handleEditMoto = (moto) => {
    setEditingMoto(moto);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setEditingMoto(null);
    setModalOpen(false);
  };
  const handleSuccess = () => loadMotos(true);

  const { colors } = useTheme();
  const styles = patioViewStyles(colors);
  return (
    <View style={styles.container}>
      <Header
        title={t.patio.title}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      {initialLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>{t.patio.loadingMotos}</Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: "red" }]}>{error}</Text>
        </View>
      )}

      {!initialLoading && !loading && !error && motos.length > 0 && (
        <FlatList
          data={motos}
          keyExtractor={(item) => String(item.motorcycleId)}
          numColumns={2}
          contentContainerStyle={styles.content}
          renderItem={({ item }) => (
            <MotoCard
              {...item}
              onDelete={deleteMoto}
              onEdit={() => handleEditMoto(item)}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            hasMore && loadingMore ? (
              <ActivityIndicator color={colors.primary} />
            ) : null
          }
        />
      )}

      {!initialLoading && !loading && !error && motos.length === 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t.patio.noMotos}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleOpenModal}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={32} color={colors.background} />
      </TouchableOpacity>
      <MotoModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        moto={editingMoto}
      />
      <Footer />
    </View>
  );
};

export default PatioPage;
