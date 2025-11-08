import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { motoModalStyles } from "../theme/styles";
import useMotoControl from "../control/motoControl";
import { useModelControl } from "../control/modelControl";
import { useSectorControl } from "../control/sectorControl";
import DropDownPicker from "react-native-dropdown-picker";
import { motoSchema, type Moto, type MotoError } from "../model/MotoModel";
import i18n from "../i18n/i18n";
import { onLanguageChange } from "../i18n/i18n";
import * as Notifications from "expo-notifications";

interface MotoModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  moto?: any;
}

const MotoModal: React.FC<MotoModalProps> = ({
  open,
  onClose,
  onSuccess,
  moto,
}) => {
  const schedulerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: `Moto ${plate || ""} cadastrada com sucesso!`,
        body: `A moto ${plate || ""} foi cadastrada no sistema.`,
      },
      trigger: {
        seconds: 10,
      },
    });
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    },
  });

  const notificationConfig = async () => {
    let permissions = await Notifications.getPermissionsAsync();
    if (permissions.status !== "granted") {
      permissions = await Notifications.requestPermissionsAsync();
    }
    if (permissions.status !== "granted") {
      Alert.alert("É necessária permissão para o envio de notificações.");
      return;
    }
    const expoPushToken = await Notifications.getExpoPushTokenAsync();

    const devicePushToken = await Notifications.getDevicePushTokenAsync();

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  };

  useEffect(() => {
    notificationConfig();

    const receivedSub = Notifications.addNotificationReceivedListener(() => {
    });

    const responseSub = Notifications.addNotificationResponseReceivedListener(
      () => {
      }
    );

    return () => {
      try {
        receivedSub.remove();
      } catch (e) {}
      try {
        responseSub.remove();
      } catch (e) {}
    };
  }, []);

  const {
    plate,
    setPlate,
    coordinates,
    setCoordinates,
    modelId,
    setModelId,
    sectorId,
    setSectorId,
    insertMoto,
    updateMoto,
    setMotorcycleId,
    loading,
    error,
    clearForm,
  } = useMotoControl();
  const { colors } = useTheme();
  const themedStyles = motoModalStyles(colors);

  const [errors, setErrors] = React.useState<MotoError>({});
  const [submitError, setSubmitError] = React.useState<string>("");
  const [openModel, setOpenModel] = React.useState(false);
  const [openSector, setOpenSector] = React.useState(false);
  const [language, setLanguage] = useState(i18n.locale);

  React.useEffect(() => {
    const unsubscribe = onLanguageChange(() => setLanguage(i18n.locale));
    return unsubscribe;
  }, []);

  const t = i18n.translations[language] || i18n.translations.pt;

  const {
    models,
    loading: loadingModels,
    error: errorModels,
    loadModels,
  } = useModelControl();
  const {
    sectors,
    loading: loadingSectors,
    error: errorSectors,
    loadSectors,
  } = useSectorControl();

  useEffect(() => {
    if (open) {
      setLanguage(i18n.locale);
      if (moto) {
        setPlate(moto.plate || "");
        setCoordinates(moto.coordinates || "");
        setModelId(moto.model?.modelId || null);
        setSectorId(moto.sector?.sectorId || null);
        setMotorcycleId(moto.motorcycleId);
      } else {
        clearForm();
      }
      setErrors({});
      setSubmitError("");
      loadModels();
      loadSectors();
    }
  }, [open, moto]);

  const validate = async () => {
    try {
      await motoSchema.validate(
        { plate, coordinates, modelId, sectorId },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (err: any) {
      const fieldErrors: MotoError = {};
      if (err.inner) {
        err.inner.forEach((e: any) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitError("");
    const valid = await validate();
    if (!valid) return;
    try {
      if (moto) {
        await updateMoto();
        if (onSuccess) onSuccess();
        onClose();
      } else {
        await insertMoto();
        try {
          schedulerNotificationHandler();
        } catch (e) {
          console.log("Erro ao agendar notificação", e);
        }
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (e: any) {
      setSubmitError(
        e?.message ||
          (moto
            ? t.motoModal?.editError || "Erro ao editar moto"
            : t.motoModal?.createError || "Erro ao cadastrar moto")
      );
    }
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={themedStyles.overlay}>
        <View style={themedStyles.modal}>
          <Text style={themedStyles.title}>
            {moto
              ? t.motoModal?.editTitle || "Editar Moto"
              : t.motoModal?.createTitle || "Cadastrar Moto"}
          </Text>
          <TextInput
            style={themedStyles.input}
            placeholder={t.motoModal?.plate || "Placa"}
            value={plate}
            onChangeText={setPlate}
            autoCapitalize="characters"
            maxLength={10}
            placeholderTextColor={colors.text + "99"}
          />
          {errors.plate && (
            <Text style={themedStyles.error}>{errors.plate}</Text>
          )}
          <TextInput
            style={themedStyles.input}
            placeholder={t.motoModal?.coordinates || "Coordenadas"}
            value={coordinates}
            onChangeText={setCoordinates}
            placeholderTextColor={colors.text + "99"}
          />
          {errors.coordinates && (
            <Text style={themedStyles.error}>{errors.coordinates}</Text>
          )}
          <Text style={themedStyles.label}>
            {t.motoModal?.model || "Modelo"}
          </Text>
          <DropDownPicker
            open={openModel}
            setOpen={setOpenModel}
            value={modelId}
            setValue={setModelId}
            items={models.map((m) => ({
              label: m.modelName,
              value: m.modelId,
            }))}
            placeholder={
              loadingModels
                ? t.motoModal?.loadingModels || "Carregando..."
                : t.motoModal?.selectModel || "Selecione o modelo"
            }
            style={{
              backgroundColor: colors.card,
              borderColor: colors.primary,
            }}
            dropDownContainerStyle={{
              backgroundColor: colors.card,
              borderColor: colors.primary,
            }}
            textStyle={{ color: colors.text }}
            placeholderStyle={{ color: colors.text + "99" }}
            listItemLabelStyle={{ color: colors.text }}
            zIndex={3000}
            zIndexInverse={1000}
          />
          {errors.modelId && (
            <Text style={themedStyles.error}>{errors.modelId}</Text>
          )}
          {errorModels && <Text style={themedStyles.error}>{errorModels}</Text>}

          <Text style={themedStyles.label}>
            {t.motoModal?.sector || "Setor"}
          </Text>
          <DropDownPicker
            open={openSector}
            setOpen={setOpenSector}
            value={sectorId}
            setValue={setSectorId}
            items={sectors.map((s) => ({ label: s.name, value: s.sectorId }))}
            placeholder={
              loadingSectors
                ? t.motoModal?.loadingSectors || "Carregando..."
                : t.motoModal?.selectSector || "Selecione o setor"
            }
            style={{
              backgroundColor: colors.card,
              borderColor: colors.primary,
            }}
            dropDownContainerStyle={{
              backgroundColor: colors.card,
              borderColor: colors.primary,
            }}
            textStyle={{ color: colors.text }}
            placeholderStyle={{ color: colors.text + "99" }}
            listItemLabelStyle={{ color: colors.text }}
            zIndex={2000}
            zIndexInverse={2000}
          />
          {errors.sectorId && (
            <Text style={themedStyles.error}>{errors.sectorId}</Text>
          )}
          {errorSectors && (
            <Text style={themedStyles.error}>{errorSectors}</Text>
          )}
          {submitError ? (
            <Text style={themedStyles.error}>{submitError}</Text>
          ) : null}
          {error && <Text style={themedStyles.error}>{error}</Text>}
          <View style={themedStyles.actions}>
            <TouchableOpacity
              style={[themedStyles.button, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.background} />
              ) : (
                <Text style={themedStyles.buttonText}>
                  {t.motoModal?.save || "Salvar"}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[themedStyles.button, { backgroundColor: colors.border }]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={[themedStyles.buttonText, { color: colors.text }]}>
                {t.motoModal?.cancel || "Cancelar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MotoModal;
