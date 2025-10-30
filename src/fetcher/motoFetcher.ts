import { mottuMappingApi } from "./api";

// Buscar motos de um pátio específico (yardId)
export const fetchMotos = async (yardId) => {
  try {
    const response = await mottuMappingApi.get(`/motos/yard/${yardId}`);
    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching motos:", error);
    return null;
  }
};

export const fetchMotoById = async (motorcycleId) => {
  try {
    const response = await mottuMappingApi.get(`/motos/${motorcycleId}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching moto by id:", error);
    return null;
  }
};

export const updateMoto = async (motorcycleId, payload) => {
  try {
    const response = await mottuMappingApi.put(
      `/motos/${motorcycleId}`,
      payload
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error updating moto:", error);
    return false;
  }
};

export const createMoto = async (payload) => {
  try {
    const response = await mottuMappingApi.post("/motos", payload);
    return response.data?.motorcycleId ?? null;
  } catch (error) {
    console.error("Error creating moto:", error);
    return null;
  }
};

export const deleteMoto = async (motorcycleId) => {
  try {
    const response = await mottuMappingApi.delete(`/motos/${motorcycleId}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting moto:", error);
    return false;
  }
};
