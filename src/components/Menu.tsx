import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import i18n from "../i18n/i18n";
import { onLanguageChange }  from "../i18n/i18n";


const Menu = (props: any) => {
  const navigation = useNavigation<any>();
  const [language, setLanguage] = useState(i18n.locale);

  React.useEffect(() => {
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);  

  const t = i18n.translations[language] || i18n.translations.pt;

  useFocusEffect(
    React.useCallback(() => {
      setLanguage(i18n.locale);
    }, [])
  );

  return (
    <DrawerContentScrollView {...props} style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Mottu Mapping</Text>
        </View>
        <View style={styles.divider} />
        
        <DrawerItem
          label={t.drawer.home}
          icon={() => <Feather name="home" size={20} color="#54C65B" />}
          onPress={() => navigation.navigate("Home")}
          labelStyle={styles.label}
          style={styles.drawerItem}
        />
        <DrawerItem
          label={t.drawer.patio}
          icon={() => <Feather name="map-pin" size={20} color="#54C65B" />}
          onPress={() => navigation.navigate("Patio")}
          labelStyle={styles.label}
          style={styles.drawerItem}
        />
        <DrawerItem
          label={t.drawer.reports}
          icon={() => <Feather name="file-text" size={20} color="#54C65B" />}
          onPress={() => navigation.navigate("Report")}
          labelStyle={styles.label}
          style={styles.drawerItem}
        />
        
        <View style={styles.divider} />
        
        <DrawerItem
          label={t.settings.title}
          icon={() => <Feather name="settings" size={20} color="#54C65B" />}
          onPress={() => navigation.navigate("Settings")}
          labelStyle={styles.label}
          style={styles.drawerItem}
        />
        <DrawerItem
          label={t.drawer.account}
          icon={() => <Feather name="user" size={20} color="#54C65B" />}
          onPress={() => navigation.navigate("Account")}
          labelStyle={styles.label}
          style={styles.drawerItem}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#54C65B",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  label: {
    color: "#C7D6B9",
    fontSize: 16,
    fontWeight: "600",
  },
  drawerItem: {
    marginVertical: 2,
  },
});

export default Menu;