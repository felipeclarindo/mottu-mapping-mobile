import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageModal from "../components/ImageModal";
import { generateReport } from "../utils";
import Header from "../components/Header";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Patio: undefined;
  Report: undefined;
};

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showRelatorioButtons, setShowRelatorioButtons] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [imagemUrl, setImagemUrl] = useState(null);
  const [relatorio, setRelatorio] = useState("");
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    email: "",
  });

  // Função para salvar dados no AsyncStorage
  const salvarDados = async () => {
    try {
      const dadosSalvos = {
        nome: "Exemplo Nome",
        email: "exemplo@email.com",
      };
      await AsyncStorage.setItem(
        "dadosFormulario",
        JSON.stringify(dadosSalvos)
      );
      console.log("Dados salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };

  // Função para carregar dados do AsyncStorage
  const carregarDados = useCallback(async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem("dadosFormulario");
      if (dadosSalvos) {
        setDadosFormulario(JSON.parse(dadosSalvos));
        console.log("Dados carregados com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, []);

  // Carregar dados ao montar o componente
  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const exibirImagem = () => {
    setModalVisible(true);
    setLoading(true);
    setTimeout(() => {
      setShowRelatorioButtons(true);
      setRelatorio(generateReport());
      setLoading(false);
    }, 3000);
  };

  const compartilharArquivo = async () => {
    try {
      // Simula a criação de um arquivo de texto
      const fileUri = `${FileSystem.cacheDirectory}relatorio.txt`;
      await FileSystem.writeAsStringAsync(fileUri, relatorio, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Compartilha o arquivo
      await Sharing.shareAsync(fileUri, {
        mimeType: "text/plain",
        dialogTitle: "Compartilhar Relatório",
      });
    } catch (error: any) {
      Alert.alert(
        "Erro",
        `Não foi possível compartilhar o arquivo: ${error.message}`
      );
      console.error("Erro ao compartilhar arquivo:", error);
    }
  };

  const irParaPatio = () => {
    navigation.navigate("Patio");
  };

  return (
    <View style={styles.container}>
      <Header
        title="Home"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      {/* Adicione o Header */}
      <ScrollView style={styles.content}>
        <Text style={styles.descricao}>
          Clique no botão abaixo para ver a imagem e gerar o relatório.
        </Text>

        <Button
          title="Mostrar Imagem e Gerar Relatório"
          onPress={exibirImagem}
          disabled={loading}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        )}

        <ImageModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          imageUrl={imagemUrl}
        />

        {showRelatorioButtons && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={compartilharArquivo}
            >
              <Text style={styles.buttonText}>Compartilhar Relatório</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={irParaPatio}>
              <Text style={styles.buttonText}>Ir para o Pátio</Text>
            </TouchableOpacity>
          </View>
        )}

        {relatorio && (
          <View style={styles.relatorioContainer}>
            <Text style={styles.relatorioTitle}>Relatório Gerado:</Text>
            <Text style={styles.relatorioTexto}>{relatorio}</Text>
          </View>
        )}
        <View style={styles.dadosContainer}>
          <Text style={styles.dadosTitle}>
            Dados do Formulário (AsyncStorage):
          </Text>
          <Text style={styles.dadosTexto}>Nome: {dadosFormulario.nome}</Text>
          <Text style={styles.dadosTexto}>Email: {dadosFormulario.email}</Text>
        </View>
        <Button title="Salvar Dados" onPress={salvarDados} />
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
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  descricao: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10, // Espaçamento entre os botões
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 150, // Defina uma largura mínima para os botões
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  relatorioContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  relatorioTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  relatorioTexto: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  dadosContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dadosTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  dadosTexto: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});
export default HomePage;
