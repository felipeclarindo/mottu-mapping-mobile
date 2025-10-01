import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import HomePage from "../pages/pages/HomePage";
import PatioPage from "../pages/pages/PatioPage";
import ReportPage from "../pages/pages/ReportPage";
import AccountPage from "../pages/pages/AccountPage";
import CustomDrawerContent from "./CustomDrawerContent";
import LoginPage from "../pages/auth/LoginPage";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#54C65B",
        drawerInactiveTintColor: "#8D8D8D",
        drawerLabelStyle: {
          fontWeight: "600",
          fontSize: 16,
        },
        drawerActiveBackgroundColor: "#1C1C1C",
        drawerStyle: {
          backgroundColor: "#000000",
        },
      }}
    >
      <Drawer.Screen
        name="home"
        component={HomePage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          title: "Início",
        }}
      />
      <Drawer.Screen
        name="patio"
        component={PatioPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
          title: "Pátio",
        }}
      />
      <Drawer.Screen
        name="report"
        component={ReportPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
          title: "Relatórios",
        }}
      />
      <Drawer.Screen
        name="account"
        component={AccountPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: "Minha Conta",
        }}
      />
    </Drawer.Navigator>
  );
}
