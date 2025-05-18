import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MotoCard from "../components/MotoCard";
import Header from "../components/Header"; // Importe o componente Header
import { useNavigation, DrawerActions } from "@react-navigation/native";

interface Moto {
  id: string;
  status: string;
}

const Patio = () => {
  const motos: Moto[] = [
    { id: "M1", status: "OK" },
    { id: "M2", status: "Em Manutenção" },
    { id: "M3", status: "Pronta" },
    { id: "M4", status: "OK" },
    { id: "M5", status: "Em Manutenção" },
    { id: "M6", status: "Pronta" },
    { id: "M7", status: "OK" },
    { id: "M8", status: "Em Manutenção" },
    { id: "M9", status: "Pronta" },
  ];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        title="Pátio de Motos"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />{" "}
      {/* Adicione o Header */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Pátio de Motos</Text>
        <View style={styles.grid}>
          {motos.map((moto) => (
            <MotoCard key={moto.id} id={moto.id} status={moto.status} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center", // Centraliza os itens na linha
  },
});

export default Patio;
