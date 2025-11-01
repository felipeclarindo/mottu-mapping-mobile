import { ActivityIndicator, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import AuthStack from "./AuthStack";

export default function MainNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(false);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#A3E635" />
      </View>
    );
  }

  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        {isLogged ? <DrawerNavigator /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}
