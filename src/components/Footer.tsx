import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import i18n, { onLanguageChange } from "../i18n/i18n";
import { useTheme } from "../context/ThemeContext";
import { footerStyles } from "../theme/styles";

type RootStackParamList = {
  home: undefined;
  account: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Footer = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [language, setLanguage] = useState(i18n.locale);
  const { colors } = useTheme();
  const styles = footerStyles(colors);

  useEffect(() => {
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

  const t = (key: string) => i18n.t(key);

  const buttons: {
    name: keyof RootStackParamList;
    icon: React.ComponentProps<typeof Feather>["name"];
    label: string;
  }[] = [
    { name: "home", icon: "home", label: t("drawer.home") },
    { name: "account", icon: "user", label: t("drawer.account") },
  ];

  return (
    <View style={styles.container}>
      {buttons.map(({ name, icon, label }) => {
        const isActive = route.name === name;
        return (
          <TouchableOpacity
            key={name}
            style={[styles.button, isActive && styles.activeButton]}
            onPress={() => navigation.navigate(name as any)}
            activeOpacity={0.7}
          >
            <Feather
              name={icon}
              size={24}
              color={isActive ? colors.primary : colors.text}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Footer;
