import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

export const ImageModal = ({
  visible,
  onClose,
  imageUrl,
}: {
  visible: boolean;
  onClose: () => void;
  imageUrl: string;
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={stylesModal.modalContainer}>
        <View style={stylesModal.modalContent}>
          <TouchableOpacity style={stylesModal.closeButton} onPress={onClose}>
            <Text style={stylesModal.closeButtonText}>X</Text>
          </TouchableOpacity>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={stylesModal.modalImage}
              resizeMode="contain"
            />
          ) : (
            <Text>Imagem não disponível</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 500,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ddd",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalImage: {
    width: "100%",
    height: 300,
    borderRadius: 5,
  },
});

export default ImageModal;
