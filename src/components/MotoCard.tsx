import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import i18n from "../i18n/i18n";
import { onLanguageChange }  from "../i18n/i18n";


const MotoCard = ({
  plate,
  sector,
  model,
  motorcycleId,
  onDelete,
  onEdit,
}: any) => {
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

  const handleDelete = () => {
    Alert.alert(
      "Remover moto",
      "Tem certeza que deseja remover esta moto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => onDelete(motorcycleId),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Image
        source={require("../assets/moto.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoRow}>
        <Text style={styles.label}>{t.patio.sector}</Text>
        <Text style={styles.value}>{sector?.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>{t.patio.sectorColor}</Text>
        <View
          style={[styles.colorSquare, { backgroundColor: sector?.colorRgb }]}
        />
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>{t.patio.plate}</Text>
        <Text style={styles.value}>{plate}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>{t.patio.model}</Text>
        <Text style={styles.value}>{model?.modelName}</Text>
      </View>
      <View
        style={{
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={onEdit}>
          <Feather name="edit-3" size={24} color="#54C65B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Feather name="trash-2" size={24} color="#f31c0c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    padding: 12,
    width: "47%",
    marginBottom: 16,
    marginHorizontal: "1.5%",
    alignItems: "center",
    shadowColor: "#000",
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
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#54C65B",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#C7D6B9",
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
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
  },
  value: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "500",
  },
});

export default MotoCard;