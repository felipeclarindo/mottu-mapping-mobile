import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import MotoCard from "../components/MotoCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import useMotoControl from "../control/motoControl";

const PatioPage = () => {
  const navigation = useNavigation();
  const { motos, loading, error, loadMotos } = useMotoControl();

  React.useEffect(() => {
    loadMotos(1);
  }, [loadMotos]);

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
        />
      )}

      {!loading && !error && motos.length === 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Nenhuma moto encontrada.</Text>
        </View>
      )}

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
});

export default PatioPage;
