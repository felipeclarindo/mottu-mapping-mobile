import { fetchSectors } from "../fetcher/sectorFetcher";
import { SectorDTO } from "../model/SectorModel";

export const sectorService = {
  getAllSectors: async (): Promise<SectorDTO[]> => {
    const sectors = await fetchSectors();
    return sectors || [];
  },
};
