import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
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
import { useNavigation, DrawerActions, useFocusEffect } from "@react-navigation/native";
import useMotoControl from "../control/motoControl";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n"; 

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

  React.useEffect(() => {
    if (isFirstLoad.current) {
      setInitialLoading(true);
      loadMotos(true).finally(() => {
        setInitialLoading(false);
        isFirstLoad.current = false;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <View style={styles.container}>
      <Header
        title={t.patio.title}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      {initialLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00FF00" />
          <Text style={styles.loadingText}>{t.patio.loadingMotos}</Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
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
              <ActivityIndicator color="#54C65B" />
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
        <MaterialIcons name="add" size={32} color="#fff" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  loadingText: {
    color: "#FFF",
    marginTop: 10,
    textAlign: "center",
    width: "100%",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 96,
    marginRight: 40,
    backgroundColor: "#54C65B",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
});

export default PatioPage;