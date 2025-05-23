import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  onMenuPress: () => void;
};

const Header = ({ title, onMenuPress }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}
      >
        <Feather name="menu" size={28} color="#A3E635" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 28, height: 28 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
    elevation: 12,
  },
  menuButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A3E635",
  },
});

export default Header;
