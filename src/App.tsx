import React from "react";
import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar hidden />
      <MainNavigator />
    </AuthProvider>
  );
}
