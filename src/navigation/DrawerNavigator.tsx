import i18n from "../i18n/i18n";

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

import HomeView from "../view/HomeView";
import PatioView from "../view/PatioView";
import ReportView from "../view/ReportView";
import AccountView from "../view/AccountView";
import CustomDrawerContent from "./CustomDrawerContent";
import SettingsView from "../view/SettingsView";
import AboutView from "../view/AboutView";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text + "99",
        drawerLabelStyle: {
          fontWeight: "600",
          fontSize: 16,
        },
        drawerActiveBackgroundColor: colors.card,
        drawerStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Drawer.Screen
        name="home"
        component={HomeView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          title: i18n.t("drawer.home"),
        }}
      />
      <Drawer.Screen
        name="patio"
        component={PatioView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
          title: i18n.t("drawer.patio"),
        }}
      />
      <Drawer.Screen
        name="report"
        component={ReportView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
          title: i18n.t("drawer.reports"),
        }}
      />
      <Drawer.Screen
        name="account"
        component={AccountView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: i18n.t("drawer.account"),
        }}
      />
      <Drawer.Screen
        name="settings"
        component={SettingsView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          title: i18n.t("drawer.settings"),
        }}
      />
      <Drawer.Screen
        name="about"
        component={AboutView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="info" size={size} color={color} />
          ),
          title: i18n.t("drawer.about"),
        }}
      />
    </Drawer.Navigator>
  );
}
