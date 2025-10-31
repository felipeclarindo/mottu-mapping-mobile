import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginView from "../view/auth/LoginView";
import RegisterView from "../view/auth/RegisterView";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={LoginView} />
      <Stack.Screen name="register" component={RegisterView} />
      <Stack.Screen name="drawer" component={DrawerNavigator} />
    </Stack.Navigator>
  );
}
