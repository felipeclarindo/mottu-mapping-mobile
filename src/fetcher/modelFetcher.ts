import axios from "axios";
import { ModelDTO } from "../model/MotoModel";
import { mottuMappingApi } from "./api";

export const fetchMotoModels = async (): Promise<ModelDTO[] | null> => {
  try {
    const response = await mottuMappingApi.get<ModelDTO[]>("/api/models");
    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching moto models:", error);
    return null;
  }
};
