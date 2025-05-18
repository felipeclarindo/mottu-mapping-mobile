import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import HomePage from "./pages/HomePage";
import PatioPage from "./pages/PatioPage";
import ReportPage from "./pages/ReportPage";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Patio"
          component={PatioPage}
          options={{ title: "Pátio de Motos" }}
        />
        <Stack.Screen
          name="Report"
          component={ReportPage}
          options={{ title: "Report" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
