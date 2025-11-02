import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function CustomDrawerContent(props: any) {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          navigation.reset?.({ index: 0, routes: [{ name: "login" }] });
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        icon={({ color, size }) => (
          <Feather name="log-out" size={size} color={color} />
        )}
        onPress={handleLogout}
        labelStyle={{ color: "#D9534F", fontWeight: "bold" }}
        style={{ marginTop: 16, borderTopWidth: 1, borderTopColor: "#222" }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#000000",
  },
  header: {
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#54C65B",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 120,
    marginBottom: 10,
  },
});
