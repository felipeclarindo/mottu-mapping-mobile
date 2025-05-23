import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ImageSourcePropType } from "react-native";

export type DrawerParamList = {
  home: undefined;
  patio: undefined;
  report: undefined;
  login: undefined;
};

export type UserProps = {
  user: string;
  email: string;
  senha?: string;
};

export type HomeScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "home"
>;

export type Moto = {
  id: string;
  setorDescription: string;
  setorName: string;
  setorColorRgb: string;
  setorId: string;
  plate?: string;
};

export type ImageModalProps = {
  visible: boolean;
  onClose: () => void;
  imageSource: ImageSourcePropType;
};

export type DashboardCardProps = {
  stats: {
    [key: string]: number;
  };
};
