import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MotoCard from "../../components/MotoCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Moto } from "../../types";

const PatioPage = () => {
  const motos: Moto[] = [
    {
      id: "M1",
      setorName: "OK",
      setorDescription: "OK",
      setorColorRgb: "#00FF00",
      setorId: "1",
    },
    {
      id: "M2",
      setorName: "Em Manutenção",
      setorDescription: "Em manutenção",
      setorColorRgb: "#FFA500",
      setorId: "2",
    },
    {
      id: "M3",
      setorName: "Pronta",
      setorDescription: "Pronta para uso",
      setorColorRgb: "#0000FF",
      setorId: "3",
    },
    {
      id: "M4",
      setorName: "OK",
      setorDescription: "OK",
      setorColorRgb: "#00FF00",
      setorId: "1",
    },
    {
      id: "M5",
      setorName: "Em Manutenção",
      setorDescription: "Em manutenção",
      setorColorRgb: "#FFA500",
      setorId: "2",
    },
    {
      id: "M6",
      setorName: "Pronta",
      setorDescription: "Pronta para uso",
      setorColorRgb: "#0000FF",
      setorId: "3",
    },
    {
      id: "M7",
      setorName: "OK",
      setorDescription: "OK",
      setorColorRgb: "#00FF00",
      setorId: "1",
    },
    {
      id: "M8",
      setorName: "Em Manutenção",
      setorDescription: "Em manutenção",
      setorColorRgb: "#FFA500",
      setorId: "2",
    },
    {
      id: "M9",
      setorName: "Pronta",
      setorDescription: "Pronta para uso",
      setorColorRgb: "#0000FF",
      setorId: "3",
    },
  ];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        title="Pátio de Motos"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {motos.map((moto) => (
            <MotoCard
              key={moto.id}
              id={moto.id}
              setorName={moto.setorName}
              setorDescription={moto.setorDescription}
              setorColorRgb={moto.setorColorRgb}
              setorId={moto.setorId}
            />
          ))}
        </View>
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
});

export default PatioPage;
