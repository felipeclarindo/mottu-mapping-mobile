import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import HomeView from "../view/HomeView";
import PatioView from "../view/PatioView";
import ReportView from "../view/ReportView";
import AccountView from "../view/AccountView";
import CustomDrawerContent from "./CustomDrawerContent";
import { logout } from "../service/authService";
import SettingsView from "../view/SettingsView";


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
        component={HomeView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          title: "Início",
        }}
      />
      <Drawer.Screen
        name="patio"
        component={PatioView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
          title: "Pátio",
        }}
      />
      <Drawer.Screen
        name="report"
        component={ReportView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
          title: "Relatórios",
        }}
      />
      <Drawer.Screen
        name="account"
        component={AccountView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: "Minha Conta",
        }}
      />
      <Drawer.Screen
        name="settings"
        component={SettingsView}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          title: "Configurações",
        }}
      />
    </Drawer.Navigator>
  );
}
