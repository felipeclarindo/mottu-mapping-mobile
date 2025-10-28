import React, { useEffect, useState } from "react";
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
import { Moto } from "../../types";

const PatioPage = () => {
  const navigation = useNavigation();

  const [motos, setMotos] = useState<Moto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.EXPO_PUBLIC_DEV_API_URL;

  useEffect(() => {
    const fetchMotos = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!API_URL) {
          throw new Error("URL da API não configurada (EXPO_PUBLIC_API_URL).");
        }

        const response = await fetch(`${API_URL}/motos`);
        if (!response.ok) {
          throw new Error(
            `Erro ${response.status}: Não foi possível buscar motos`
          );
        }

        const data = await response.json();

        const motosArray = Array.isArray(data) ? data : data.motos;

        if (!Array.isArray(motosArray)) {
          throw new Error("Formato de dados inválido recebido da API");
        }

        const formattedMotos: Moto[] = motosArray.map(
          (item: any, index: number) => ({
            id: String(item.id || index + 1),
            plate: item.plate || `MOCK-PLATE-${index + 1}`,
            sectorId: item.sectorId || 1,
            model: item.model || "Modelo Mock",
            color: item.color || "Preto",
            ownerName: item.ownerName || "Proprietário desconhecido",
            setorDescription:
              item.setorDescription || "Descrição não informada pelo setor.",
            setorName: item.setorName || "Setor Desconhecido",
            setorColorRgb: item.setorColorRgb || "#000000",
            setorId: item.setorId || 1,
          })
        );

        setMotos(formattedMotos);
      } catch (err: any) {
        console.error("Erro ao buscar motos:", err);
        setError(err.message || "Erro inesperado ao buscar motos.");
      } finally {
        setLoading(false);
      }
    };

    fetchMotos();
  }, [API_URL]);

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
          keyExtractor={(item) => item.id}
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
