import React from "react";

import MainNavigator from "./navigation/MainNavigator";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StatusBar hidden />
        <MainNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
