import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { AccountScreenNavigationProp } from "../model/navigation";
import { useAuth } from "../context/AuthContext";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n";
import { useTheme } from "../context/ThemeContext";
import { accountViewStyles } from "../theme/styles";

const AccountPage = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<AccountScreenNavigationProp>();
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

  const handleLogout = () => {
    Alert.alert(t.account.logout, t.account.logoutConfirm, [
      { text: t.account.cancel, style: "cancel" },
      {
        text: t.account.logout,
        style: "destructive",
        onPress: async () => {
          await logout();
          navigation.reset({ index: 0, routes: [{ name: "login" }] });
        },
      },
    ]);
  };

  const { colors } = useTheme();
  const styles = accountViewStyles(colors);
  return (
    <View style={styles.container}>
      <Header
        title={t.account.title}
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t.account.accountInfo}</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/profile-generic.jpg")}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.profileName}>
            {user?.username || t.account.user}
          </Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>{t.account.logout}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default AccountPage;
