import i18n from "../i18n/i18n";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, Alert } from "react-native";
import { drawerStyles } from "../theme/styles";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function CustomDrawerContent(props: any) {
  const { logout } = useAuth();
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = drawerStyles(colors);

  const handleLogout = () => {
    Alert.alert(i18n.t("drawer.logout"), i18n.t("account.logoutConfirm"), [
      { text: i18n.t("account.cancel"), style: "cancel" },
      {
        text: i18n.t("drawer.logout"),
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
        label={i18n.t("drawer.logout")}
        icon={({ color, size }) => (
          <Feather name="log-out" size={size} color={colors.primary} />
        )}
        onPress={handleLogout}
        labelStyle={styles.logoutLabel}
        style={styles.logoutButton}
      />
    </DrawerContentScrollView>
  );
}
