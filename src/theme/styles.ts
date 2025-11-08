// Drawer styles for CustomDrawerContent
export const drawerStyles = (colors: any) =>
  StyleSheet.create({
    drawerContent: baseContainer(colors),
    header: {
      alignItems: "center",
      paddingVertical: 32,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
    },
    logo: {
      width: 150,
      height: 150,
    },
    logoutButton: {
      borderWidth: 1,
      borderColor: colors.primary,
    },
    logoutLabel: {
      ...baseButtonText({ ...colors, background: colors.card }, 16, "bold"),
      color: colors.primary,
    },
  });
export const baseContainer = (colors: any) => ({
  flex: 1,
  backgroundColor: colors.background,
});

const baseContent = (padding = 20) => ({
  padding,
  flexGrow: 1,
});

const baseTitle = (
  colors: any,
  size = 24,
  marginBottom = 24,
  align: "center" | "left" = "center"
) =>
  ({
    fontSize: size,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: align,
    marginBottom,
  } as import("react-native").TextStyle);

const baseSubtitle = (
  colors: any,
  size = 16,
  marginTop = 0,
  marginBottom = 0
) =>
  ({
    fontSize: size,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginTop,
    marginBottom,
  } as import("react-native").TextStyle);

const baseLabel = (
  colors: any,
  size = 14,
  weight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900" = "bold",
  colorOverride?: string
) =>
  ({
    fontSize: size,
    fontWeight: weight,
    color: colorOverride || colors.text,
  } as import("react-native").TextStyle);

const baseButton = (colors: any) => ({
  backgroundColor: colors.primary,
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: "center" as const,
});

const baseButtonText = (
  colors: any,
  size = 16,
  weight: "bold" | "normal" = "bold"
) =>
  ({
    color: colors.background,
    fontSize: size,
    fontWeight: weight,
  } as import("react-native").TextStyle);

export const settingsViewStyles = (colors: any) =>
  StyleSheet.create({
    container: baseContainer(colors),
    content: baseContent(20),
    title: baseTitle(colors, 24, 32),
    section: {
      backgroundColor: colors.card,
      borderColor: colors.primary,
      borderWidth: 1,
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
    },
    sectionTitle: { ...baseLabel(colors, 18, "600"), marginBottom: 16 },
    languageButton: {
      ...baseButton({ ...colors, primary: colors.background }),
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 12,
      borderWidth: 2,
      borderColor: "transparent",
    },
    languageButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    languageButtonText: {
      ...baseLabel(colors, 16, "600"),
      textAlign: "center",
    },
    languageButtonTextActive: {
      color: colors.background,
    },
  });

export const accountViewStyles = (colors: any) =>
  StyleSheet.create({
    container: baseContainer(colors),
    content: baseContent(20),
    title: baseTitle(colors, 24, 24),
    profileContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 12,
      backgroundColor: colors.card,
    },
    profileName: baseTitle(colors, 20, 8),
    card: {
      backgroundColor: colors.card,
      borderColor: colors.primary,
      borderWidth: 1,
      borderRadius: 12,
      padding: 16,
      marginBottom: 32,
    },
    label: { ...baseLabel(colors, 14, "600"), marginTop: 12 },
    value: { ...baseLabel(colors, 16, "500"), marginTop: 4 },
    buttonGroup: {
      gap: 16,
    },
    primaryButton: baseButton(colors),
    primaryButtonText: baseButtonText(colors, 16, "bold"),
    secondaryButton: {
      ...baseButton({ ...colors, primary: "#D9534F" }),
    },
    secondaryButtonText: baseButtonText(
      { ...colors, background: "white" },
      16,
      "bold"
    ),
  });
// ReportView
export const reportViewStyles = (colors: any) =>
  StyleSheet.create({
    container: baseContainer(colors),
    content: baseContent(20),
    title: baseTitle(colors, 24, 16),
    card: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    relatorioTexto: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    button: baseButton(colors),
    buttonText: baseButtonText(colors, 16, "bold"),
  });
// PatioView
export const patioViewStyles = (colors: any) =>
  StyleSheet.create({
    container: baseContainer(colors),
    content: baseContent(16),
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width: "100%",
      height: "100%",
    },
    loadingText: {
      color: colors.text,
      marginTop: 10,
      textAlign: "center" as const,
      width: "100%",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    errorText: {
      ...baseLabel(colors, 16, "600", "red"),
      textAlign: "center",
    },
    fab: {
      position: "absolute",
      alignSelf: "flex-end",
      bottom: 96,
      marginRight: 40,
      backgroundColor: colors.primary,
      width: 56,
      height: 56,
      borderRadius: 28,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      zIndex: 10,
    },
  });
// LoginView
export const loginViewStyles = (colors: any) =>
  StyleSheet.create({
    container: baseContainer(colors),
    content: {
      paddingVertical: 10,
      paddingHorizontal: 45,
      flexGrow: 1,
      justifyContent: "center",
    },
    title: baseTitle(colors, 28, 32),
    input: {
      height: 50,
      backgroundColor: colors.card,
      borderColor: colors.primary,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 16,
      marginBottom: 20,
      color: colors.text,
    },
    button: { ...baseButton(colors), marginBottom: 24 },
    buttonText: baseButtonText(colors, 16, "bold"),
    footerText: {
      ...baseLabel(colors, 14, "500"),
      textAlign: "center",
    },
    linkText: {
      ...baseLabel(colors, 16, "700", colors.primary),
      textDecorationLine: "underline",
    },
    logo: {
      width: 250,
      height: 200,
      alignSelf: "center",
      marginBottom: 40,
    },
    langButton: {
      ...baseLabel(colors, 16, "600", colors.primary),
      textDecorationLine: "underline",
    },
  });
// HomeView
export const homeViewStyles = (colors: any) =>
  StyleSheet.create({
    container: baseContainer(colors),
    content: baseContent(20),
    title: baseTitle(colors, 28, 16),
    subtitle: baseSubtitle(colors, 22, 16, 12),
    chart: {
      marginVertical: 8,
      borderRadius: 12,
    },
    mainButton: {
      ...baseButton(colors),
      paddingVertical: 16,
      marginBottom: 24,
      elevation: 5,
    },
    mainButtonText: baseButtonText(colors, 16, "bold"),
    loadingContainer: {
      alignItems: "center",
      marginBottom: 24,
    },
    loadingText: {
      ...baseLabel(colors, 14, "500", colors.primary),
      marginTop: 12,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 24,
    },
    button: {
      flex: 1,
      ...baseButton({ ...colors, primary: colors.card }),
      elevation: 3,
    },
    buttonText: { ...baseLabel(colors, 14, "700", colors.primary) },
    logoutButton: {
      ...baseButton({ ...colors, primary: "#D9534F" }),
      marginBottom: 32,
    },
    logoutButtonText: baseButtonText(
      { ...colors, background: "#D9534F" },
      16,
      "bold"
    ),
  });
// Footer
export const footerStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: colors.background,
      paddingVertical: 14,
      paddingBottom: 56,
      justifyContent: "space-around",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: colors.border,
      elevation: 10,
    },
    button: {
      alignItems: "center",
      paddingHorizontal: 20,
    },
    activeButton: {
      borderTopWidth: 2,
      borderTopColor: colors.primary,
      paddingTop: 7,
    },
    label: { ...baseLabel(colors, 12, "600"), marginTop: 4 },
    activeLabel: { ...baseLabel(colors, 12, "700", colors.primary) },
  });

// Header
export const headerStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      height: 80,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      elevation: 12,
      paddingTop: 48,
      backgroundColor: colors.background,
      borderBottomColor: colors.border,
    },
    menuButton: {
      padding: 4,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    title: { ...baseTitle(colors, 20, 0), flex: 1, marginHorizontal: 10 },
    logo: {
      width: 40,
      height: 40,
    },
  });

// ImageModal
export const imageModalStyles = (colors: any) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.isDark
        ? "rgba(0,0,0,0.7)"
        : "rgba(255,255,255,0.7)",
    },
    modalContent: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 12,
      width: "90%",
      maxWidth: 500,
      alignItems: "center",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: 12,
      right: 12,
      backgroundColor: colors.background,
      borderRadius: 16,
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      ...baseLabel(colors, 18, "700", colors.primary),
    },
    modalImage: {
      width: "100%",
      height: 300,
      borderRadius: 8,
      marginBottom: 16,
    },
    downloadButton: {
      ...baseButton(colors),
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    downloadButtonText: baseButtonText(colors, 16, "bold"),
    errorText: {
      color: colors.text,
      textAlign: "center",
    },
  });

// Menu
export const menuStyles = (colors: any) =>
  StyleSheet.create({
    scrollView: {
      backgroundColor: colors.background,
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
    title: baseTitle(colors, 22, 0),
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginHorizontal: 16,
      marginVertical: 8,
    },
    label: baseLabel(colors, 16, "600"),
    drawerItem: {
      marginVertical: 2,
    },
  });

export const motoCardStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      width: "47%",
      marginBottom: 16,
      marginHorizontal: "1.5%",
      alignItems: "center" as const,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    image: {
      width: "100%",
      height: 280,
      borderRadius: 8,
      marginBottom: 12,
    },
    colorSquare: {
      width: 20,
      height: 20,
      borderRadius: 4,
      marginLeft: 8,
    },
    title: baseTitle(colors, 16, 2),
    subtitle: {
      ...baseLabel(colors, 14, "500"),
      textAlign: "center",
      marginBottom: 12,
    },
    infoRow: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    label: baseLabel(colors, 12, "600"),
    value: baseLabel(colors, 12, "500"),
  });

export const motoModalStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.isDark
        ? "rgba(0,0,0,0.7)"
        : "rgba(255,255,255,0.7)",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 24,
      width: 320,
      alignItems: "stretch",
    },
    title: { ...baseTitle(colors, 20, 16, "center"), color: colors.text },
    input: {
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: 8,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    error: {
      ...baseLabel(colors, 14, "600", "red"),
      marginBottom: 8,
    },
    actions: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      marginTop: 16,
    },
    button: {
      flex: 1,
      ...baseButton(colors),
      paddingVertical: 12,
      borderRadius: 6,
      marginHorizontal: 4,
    },
    buttonText: baseButtonText(colors, 16, "bold"),
    label: { ...baseLabel(colors, 15, "500"), marginBottom: 4, marginTop: 8 },
  });

// Separator
export const separatorStyles = (colors: any) =>
  StyleSheet.create({
    separator: {
      height: 1,
      width: "100%" as const,
      backgroundColor: colors.border,
      marginVertical: 10,
    },
  });

// DashboardCard
export const dashboardCardStyles = (colors: any) =>
  StyleSheet.create({
    dashboard: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    statCard: {
      width: 110, // Ajuste para responsividade se necessário
      backgroundColor: colors.card,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginTop: 12,
    },
    statNumber: baseTitle(colors, 24, 0),
    statLabel: {
      ...baseLabel(colors, 14, "500"),
      marginTop: 4,
      textAlign: "center",
    },
  });

import { lightColors, darkColors } from "./colors";
import { StyleSheet, TextStyle } from "react-native";

export const theme = {
  light: lightColors,
  dark: darkColors,
};

export function createThemedStyles(getStyles: (colors: any) => any) {
  return (colors: any) => StyleSheet.create(getStyles(colors));
}
