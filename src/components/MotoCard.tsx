import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MotoCardProps {
  id: string;
  status: string;
}

const MotoCard: React.FC<MotoCardProps> = ({ id, status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "OK":
        return "#28a745";
      case "Em Manutenção":
        return "#ffc107";
      case "Pronta":
        return "#007bff";
      default:
        return "#6c757d";
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <View style={styles.card}>
      <Text style={styles.id}>ID: {id}</Text>
      <Text style={[styles.status, { color: statusColor }]}>
        Status: {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    width: "45%",
    minWidth: 150,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  id: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default MotoCard;
