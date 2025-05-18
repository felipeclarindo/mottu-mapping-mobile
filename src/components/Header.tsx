import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuPress }) => {
  return (
    <View style={styles.container}>
      {onMenuPress && (
        <TouchableOpacity style={styles.menuIcon} onPress={onMenuPress}>
          <Feather name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  menuIcon: {
    marginRight: 10,
  },
});

export default Header;
