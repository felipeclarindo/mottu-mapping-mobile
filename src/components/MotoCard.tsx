import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n";
import { useTheme } from "../context/ThemeContext";
import { motoCardStyles } from "../theme/styles";

const MotoCard = ({
  plate,
  sector,
  model,
  motorcycleId,
  onDelete,
  onEdit,
}: any) => {
  const [language, setLanguage] = useState(i18n.locale);
  const t = i18n.translations[language] || i18n.translations.pt;
  const { colors } = useTheme();
  const styles = motoCardStyles(colors);
  React.useEffect(() => {
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLanguage(i18n.locale);
    }, [])
  );

  const handleDelete = () => {
    Alert.alert("Remover moto", "Tem certeza que deseja remover esta moto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => onDelete(motorcycleId),
      },
    ]);
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
        <Text style={styles.value}>
          {(() => {
            if (!sector?.name) return "";
            const normalize = (str: string) =>
              str
                .toLowerCase()
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
                .replace(/\s+/g, "");
            const key = normalize(sector.name);
            const translated = t.patio.sectors[key] || sector.name;
            return translated;
          })()}
        </Text>
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
          <Feather name="edit-3" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Feather name="trash-2" size={24} color="#f31c0c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MotoCard;
