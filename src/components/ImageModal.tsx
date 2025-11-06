import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import { useTheme } from "../context/ThemeContext";
import { imageModalStyles } from "../theme/styles";

const ImageModal = ({ visible, onClose, imageSource }) => {
  // const [downloading, setDownloading] = useState(false);
  const { colors } = useTheme();
  const themedStyles = imageModalStyles(colors);

  // const handleDownload = async () => {
  //   try {
  //     setDownloading(true);
  //     const perm = await MediaLibrary.requestPermissionsAsync();
  //     if (perm.status !== "granted" && perm.granted !== true) {
  //       Alert.alert("Permissão negada", "Não foi possível acessar a galeria.");
  //       setDownloading(false);
  //       return;
  //     }
  //     let uri: string | undefined;
  //     if (typeof imageSource === "number") {
  //       uri = Image.resolveAssetSource(imageSource).uri;
  //     } else if (Array.isArray(imageSource)) {
  //       uri = imageSource[0]?.uri;
  //     } else {
  //       uri = imageSource?.uri;
  //     }
  //     if (!uri) {
  //       Alert.alert("Erro", "URI da imagem não encontrada.");
  //       setDownloading(false);
  //       return;
  //     }
  //     const baseDir =
  //       (FileSystem as any).cacheDirectory ??
  //       (FileSystem as any).documentDirectory ??
  //       "";
  //     const rawName = uri.split("/").pop();
  //     const safeName = (rawName ?? `${Date.now()}`).split("?")[0];
  //     const fileUri = baseDir + safeName;
  //     await FileSystem.downloadAsync(uri, fileUri);
  //     await MediaLibrary.saveToLibraryAsync(fileUri);
  //     Alert.alert("Sucesso", "Imagem salva na galeria!");
  //   } catch (e) {
  //     console.error(e);
  //     Alert.alert("Erro", "Não foi possível salvar a imagem.");
  //   } finally {
  //     setDownloading(false);
  //   }
  // };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={themedStyles.modalContainer}>
        <View style={themedStyles.modalContent}>
          <TouchableOpacity style={themedStyles.closeButton} onPress={onClose}>
            <Text style={themedStyles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {imageSource ? (
            <>
              <Image
                source={imageSource}
                style={themedStyles.modalImage}
                resizeMode="contain"
              />
            </>
          ) : (
            <Text style={themedStyles.errorText}>Imagem não disponível</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;
