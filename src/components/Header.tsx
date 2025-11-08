import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { headerStyles } from "../theme/styles";

type HeaderProps = {
  title: string;
  onMenuPress: () => void;
};

const Header = ({ title, onMenuPress }: HeaderProps) => {
  const { colors } = useTheme();
  const styles = headerStyles(colors);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}
      >
        <Feather name="menu" size={28} color={colors.primary} />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Image
        source={require("../assets/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Header;
