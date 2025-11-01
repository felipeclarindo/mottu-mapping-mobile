import * as motoFetcher from "../fetcher/motoFetcher";
export const motoService = {
  getAllMotos: async (page = 0, size = 10) => {
    return await motoFetcher.fetchMotos(page, size);
  },
  getMoto: async (motorcycleId) => {
    return await motoFetcher.fetchMotoById(motorcycleId);
  },
  updateMoto: async (motorcycleId, payload) => {
    const ok = await motoFetcher.updateMoto(motorcycleId, payload);
    if (!ok) throw new Error("failed to update moto");
    return await motoFetcher.fetchMotoById(motorcycleId);
  },
  createMoto: async (payload) => {
    const id = await motoFetcher.createMoto(payload);
    if (!id) throw new Error("failed to create moto");
    return id;
  },
  deleteMoto: async (motorcycleId) => {
    const ok = await motoFetcher.deleteMoto(motorcycleId);
    if (!ok) throw new Error("failed to delete moto");
    return ok;
  },
  countMotosBySector: async () => {
    return await motoFetcher.fetchCountMotosBySector();
  },
};
