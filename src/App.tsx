// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import AppStack from "./navigation/AppStack";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <ExpoStatusBar translucent backgroundColor="transparent" style="dark" />
        <AppStack />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 0,
    margin: 0,
    backgroundColor: "#fff",
  },
});
