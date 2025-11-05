import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import i18n, { onLanguageChange } from "../i18n/i18n";

type RootStackParamList = {
  home: undefined;
  account: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Footer = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [language, setLanguage] = useState(i18n.locale);

  // registra listener para atualizar quando idioma mudar
  useEffect(() => {
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

  // função helper para pegar tradução
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
              color={isActive ? "#54C65B" : "#5A7D4C"}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#121212",
    paddingVertical: 14,
    paddingBottom: 56,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
    elevation: 10,
  },
  button: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  activeButton: {
    borderTopWidth: 2,
    borderTopColor: "#54C65B",
    paddingTop: 7,
  },
  label: {
    color: "#5A7D4C",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  activeLabel: {
    color: "#54C65B",
    fontWeight: "700",
  },
});

export default Footer;
