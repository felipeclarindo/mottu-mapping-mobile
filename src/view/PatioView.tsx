import React, { useState } from "react";
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
import { useNavigation, DrawerActions } from "@react-navigation/native";
import useMotoControl from "../control/motoControl";

const PatioPage = () => {
  const navigation = useNavigation();
  const { motos, loading, error, loadMotos, hasMore } = useMotoControl();
  const [modalOpen, setModalOpen] = useState(false);

  React.useEffect(() => {
    if (motos.length === 0) {
      loadMotos(true);
    }
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadMotos();
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSuccess = () => loadMotos(true);

  return (
    <View style={styles.container}>
      <Header
        title="Pátio de Motos"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00FF00" />
          <Text style={styles.loadingText}>Carregando motos...</Text>
        </View>
      )}

      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!loading && !error && motos.length > 0 && (
        <FlatList
          data={motos}
          keyExtractor={(item) => String(item.motorcycleId)}
          numColumns={2}
          contentContainerStyle={styles.content}
          renderItem={({ item }) => <MotoCard {...item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            hasMore && loading ? <ActivityIndicator color="#54C65B" /> : null
          }
        />
      )}

      {!loading && !error && motos.length === 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Nenhuma moto encontrada.</Text>
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
  },
  loadingText: {
    color: "#FFF",
    marginTop: 10,
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
