import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meu App</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#000000",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0B3D0B",
  },
  headerText: {
    color: "#0B3D0B",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
