import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Header from "../components/Header";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { generateCompleteReport } from "../utils";

const RelatorioScreen = () => {
  const relatorioCompleto = generateCompleteReport();
  const navigation = useNavigation();

  const compartilharRelatorio = async () => {
    try {
      // Cria um arquivo de texto com o relatório
      const fileUri = `${FileSystem.cacheDirectory}relatorio_completo.txt`;
      await FileSystem.writeAsStringAsync(fileUri, relatorioCompleto, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Compartilha o arquivo
      await Sharing.shareAsync(fileUri, {
        mimeType: "text/plain",
        dialogTitle: "Compartilhar Relatório Completo",
      });
    } catch (error: any) {
      Alert.alert(
        "Erro",
        `Não foi possível compartilhar o arquivo: ${error.message}`
      );
      console.error("Erro ao compartilhar relatório:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Relatório"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      {/* Adicione o Header */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Relatório Completo do Pátio</Text>
        <Text style={styles.relatorioTexto}>{relatorioCompleto}</Text>
        <TouchableOpacity style={styles.button} onPress={compartilharRelatorio}>
          <Text style={styles.buttonText}>Compartilhar Relatório</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  relatorioTexto: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 200,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RelatorioScreen;
