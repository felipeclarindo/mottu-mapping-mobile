import { useState, useCallback } from "react";
import { sectorService } from "../service/sectorService";
import { SectorDTO } from "../model/SectorModel";

export function useSectorControl() {
  const [sectors, setSectors] = useState<SectorDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSectors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sectorService.getAllSectors();
      setSectors(data);
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar setores");
    } finally {
      setLoading(false);
    }
  }, []);

  return { sectors, loading, error, loadSectors };
}
