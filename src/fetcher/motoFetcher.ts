import { mottuMappingApi } from "./api";
import { MotoPage, MotoResponse, CountSectorDTO } from "../model/MotoModel";

export const fetchMotos = async (
  page = 0,
  size = 10
): Promise<MotoPage | null> => {
  try {
    const response = await mottuMappingApi.get<MotoPage>(
      `/api/motos?page=${page}&size=${size}&sort=plate,asc`
    );
    return response.data ?? null;
  } catch (error: any) {
    console.error(
      "[fetchMotos] Erro ao buscar motos:",
      error?.response?.data || error
    );
    return null;
  }
};

export const fetchMotoById = async (motorcycleId) => {
  try {
    const response = await mottuMappingApi.get(`/api/motos/${motorcycleId}`);
    return response.data ?? null;
  } catch (error) {
    console.error("Error fetching moto by id:", error);
    return null;
  }
};

export const updateMoto = async (motorcycleId, payload) => {
  try {
    const response = await mottuMappingApi.put(
      `/api/motos/${motorcycleId}`,
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
    const response = await mottuMappingApi.post("/api/motos", payload);
    return response.data?.motorcycleId ?? null;
  } catch (error) {
    console.error("Error creating moto:", error);
    return null;
  }
};

export const deleteMoto = async (motorcycleId) => {
  try {
    const response = await mottuMappingApi.delete(`/api/motos/${motorcycleId}`);
    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Error deleting moto:", error?.response?.data || error);
    return false;
  }
};

export const fetchCountMotosBySector = async (): Promise<
  CountSectorDTO[] | null
> => {
  try {
    const response = await mottuMappingApi.get<CountSectorDTO[]>(
      "/api/motos/count-motos-by-sector"
    );
    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching count motos by sector:", error);
    return null;
  }
};
