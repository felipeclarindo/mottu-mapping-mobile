import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

import PatioPage from "../pages/screens/PatioPage";
import ReportPage from "../pages/screens/ReportPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AccountPage from "../pages/screens/AccountPage";
import CustomDrawerContent from "./CustomDrawerContent";
import HomePage from "../pages/screens/HomePage";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="login"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#0B3D0B",
        drawerInactiveTintColor: "#4F5B4B",
        drawerLabelStyle: {
          fontWeight: "600",
          fontSize: 16,
        },
        drawerActiveBackgroundColor: "#122A12",
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
        }}
      />
      <Drawer.Screen
        name="patio"
        component={PatioPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="report"
        component={ReportPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="login"
        component={LoginPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="log-in" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="register"
        component={RegisterPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user-plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="account"
        component={AccountPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
