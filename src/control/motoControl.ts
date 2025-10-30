import { useState, useEffect } from "react";
import { motoService } from "../service/motoService";

export const useMotoControl = () => {
  const [motorcycleId, setMotorcycleId] = useState(null);
  const [plate, setPlate] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [modelId, setModelId] = useState(null);
  const [sectorId, setSectorId] = useState(null);
  const [yardId, setYardId] = useState(null);

  const [motos, setMotos] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Monta o payload para criar/editar
  const getMotoPayload = () => ({
    plate,
    coordinates,
    modelId,
    sectorId,
  });

  const insertMoto = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = getMotoPayload();
      const newId = await motoService.createMoto(payload);
      const created = await motoService.getMoto(newId);
      if (created) setMotos((s) => [...s, created]);
      clearForm();
      return newId;
    } catch (e) {
      setError(e?.message || "Error inserting moto");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const loadMotos = async (yardId) => {
    setLoading(true);
    setError(null);
    try {
      const list = await motoService.getAllMotos(yardId);
      setMotos(list ?? []);
      return list;
    } catch (e) {
      setError(e?.message || "Error loading motos");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deleteMoto = async (removeId) => {
    setLoading(true);
    setError(null);
    try {
      await motoService.deleteMoto(removeId);
      setMotos((s) => s.filter((m) => m.motorcycleId !== removeId));
    } catch (e) {
      setError(e?.message || "Error deleting moto");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const updateMoto = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!motorcycleId) throw new Error("motorcycleId is required to update");
      const payload = getMotoPayload();
      const updated = await motoService.updateMoto(motorcycleId, payload);
      setMotos((s) =>
        s.map((m) => (m.motorcycleId === updated.motorcycleId ? updated : m))
      );
      clearForm();
      return updated;
    } catch (e) {
      setError(e?.message || "Error updating moto");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setMotorcycleId(null);
    setPlate("");
    setCoordinates("");
    setModelId(null);
    setSectorId(null);
    setYardId(null);
  };

  useEffect(() => {
    loadMotos(1).catch(() => {});
  }, []);

  return {
    motorcycleId,
    setMotorcycleId,
    plate,
    setPlate,
    coordinates,
    setCoordinates,
    modelId,
    setModelId,
    sectorId,
    setSectorId,
    yardId,
    setYardId,
    motos,
    loading,
    error,
    insertMoto,
    loadMotos,
    deleteMoto,
    updateMoto,
    clearForm,
  };
};

export default useMotoControl;
