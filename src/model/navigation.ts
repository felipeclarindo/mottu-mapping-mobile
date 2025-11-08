import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type DrawerParamList = {
  home: undefined;
  patio: undefined;
  report: undefined;
  account: undefined;
  login: undefined;
};

export type HomeScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "home"
>;

export type AccountScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "account"
>;

export type AuthStackParamList = {
  login: undefined;
  register: undefined;
  drawer: DrawerParamList;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "login"
>;
