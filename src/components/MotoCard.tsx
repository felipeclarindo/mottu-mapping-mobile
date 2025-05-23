import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Moto } from "../types";

interface MotoCardProps extends Moto {}

const MotoCard = ({
  id,
  setorDescription,
  setorName,
  setorColorRgb,
  setorId,
}: MotoCardProps) => {
  return (
    <View style={styles.card}>
      <View style={[styles.colorSquare, { backgroundColor: setorColorRgb }]} />
      <Text style={styles.title}>{setorName}</Text>
      <Text style={styles.subtitle}>{setorDescription}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{id}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Setor ID:</Text>
        <Text style={styles.value}>{setorId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    padding: 16,
    width: "45%",
    minWidth: 160,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  colorSquare: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#A3E635",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#C7D6B9",
    textAlign: "center",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
  },
  value: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "500",
  },
});

export default MotoCard;
