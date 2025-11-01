import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import DrawerNavigator from "./DrawerNavigator";

import { ActivityIndicator, View } from "react-native";

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
    <NavigationContainer>
      {isLogged ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
