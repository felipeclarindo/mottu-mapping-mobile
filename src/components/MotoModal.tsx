import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useMotoControl from "../control/motoControl";
import { useModelControl } from "../control/modelControl";
import { useSectorControl } from "../control/sectorControl";
import DropDownPicker from "react-native-dropdown-picker";
import { motoSchema, type Moto, type MotoError } from "../model/MotoModel";

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

  const [errors, setErrors] = React.useState<MotoError>({});
  const [submitError, setSubmitError] = React.useState<string>("");
  const [openModel, setOpenModel] = React.useState(false);
  const [openSector, setOpenSector] = React.useState(false);

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
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (e: any) {
      setSubmitError(
        e?.message || (moto ? "Erro ao editar moto" : "Erro ao cadastrar moto")
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
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>
            {moto ? "Editar Moto" : "Cadastrar Moto"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Placa"
            value={plate}
            onChangeText={setPlate}
            autoCapitalize="characters"
            maxLength={10}
            placeholderTextColor="#aaa"
          />
          {errors.plate && <Text style={styles.error}>{errors.plate}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Coordenadas"
            value={coordinates}
            onChangeText={setCoordinates}
            placeholderTextColor="#aaa"
          />
          {errors.coordinates && (
            <Text style={styles.error}>{errors.coordinates}</Text>
          )}
          <Text style={styles.label}>Modelo</Text>
          <DropDownPicker
            open={openModel}
            setOpen={setOpenModel}
            value={modelId}
            setValue={setModelId}
            items={models.map((m) => ({
              label: m.modelName,
              value: m.modelId,
            }))}
            placeholder={loadingModels ? "Carregando..." : "Selecione o modelo"}
            style={{ backgroundColor: "#222", borderColor: "#54C65B" }}
            dropDownContainerStyle={{
              backgroundColor: "#222",
              borderColor: "#54C65B",
            }}
            textStyle={{ color: "#fff" }}
            placeholderStyle={{ color: "#aaa" }}
            listItemLabelStyle={{ color: "#fff" }}
            zIndex={3000}
            zIndexInverse={1000}
          />
          {errors.modelId && <Text style={styles.error}>{errors.modelId}</Text>}
          {errorModels && <Text style={styles.error}>{errorModels}</Text>}

          <Text style={styles.label}>Setor</Text>
          <DropDownPicker
            open={openSector}
            setOpen={setOpenSector}
            value={sectorId}
            setValue={setSectorId}
            items={sectors.map((s) => ({ label: s.name, value: s.sectorId }))}
            placeholder={loadingSectors ? "Carregando..." : "Selecione o setor"}
            style={{ backgroundColor: "#222", borderColor: "#54C65B" }}
            dropDownContainerStyle={{
              backgroundColor: "#222",
              borderColor: "#54C65B",
            }}
            textStyle={{ color: "#fff" }}
            placeholderStyle={{ color: "#aaa" }}
            listItemLabelStyle={{ color: "#fff" }}
            zIndex={2000}
            zIndexInverse={2000}
          />
          {errors.sectorId && (
            <Text style={styles.error}>{errors.sectorId}</Text>
          )}
          {errorSectors && <Text style={styles.error}>{errorSectors}</Text>}
          {submitError ? <Text style={styles.error}>{submitError}</Text> : null}
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#54C65B" }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Salvar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#888" }]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 24,
    width: 320,
    alignItems: "stretch",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 4,
    marginTop: 8,
  },
});

export default MotoModal;
