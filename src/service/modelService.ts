import { fetchMotoModels } from "../fetcher/modelFetcher";
import { ModelDTO } from "../model/MotoModel";

export const modelService = {
  getAllModels: async (): Promise<ModelDTO[]> => {
    const models = await fetchMotoModels();
    return models || [];
  },
};
