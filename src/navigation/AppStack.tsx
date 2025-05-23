import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "../pages/screens/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import PatioPage from "../pages/screens/PatioPage";
import AccountPage from "../pages/screens/AccountPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ReportPage from "../pages/screens/ReportPage";
import Header from "../components/Header";

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="login" component={LoginPage} />
      <Drawer.Screen name="register" component={RegisterPage} />
      <Drawer.Screen
        name="home"
        component={HomePage}
        options={({ navigation }) => ({
          header: () => (
            <Header
              title="Início"
              onMenuPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="patio"
        component={PatioPage}
        options={({ navigation }) => ({
          header: () => (
            <Header title="Pátio" onMenuPress={() => navigation.openDrawer()} />
          ),
        })}
      />
      <Drawer.Screen
        name="report"
        component={ReportPage}
        options={({ navigation }) => ({
          header: () => (
            <Header
              title="Relatórios"
              onMenuPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="account"
        component={AccountPage}
        options={({ navigation }) => ({
          header: () => (
            <Header title="Conta" onMenuPress={() => navigation.openDrawer()} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}
