import { ActivityIndicator, View } from "react-native";
import { baseContainer } from "../theme/styles";
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
    // Use baseContainer for loading view styling
    return (
      <View style={baseContainer({ background: "#fff" })}>
        <ActivityIndicator size="large" color="#A3E635" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        {isLogged ? <DrawerNavigator /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
}
