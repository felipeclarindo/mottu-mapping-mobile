import { SectorDTO } from "../model/MotoModel";
import { mottuMappingApi } from "./api";

export const fetchSectors = async (): Promise<SectorDTO[] | null> => {
  try {
    const response = await mottuMappingApi.get<SectorDTO[]>("/sectors");
    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching sectors:", error);
    return null;
  }
};
