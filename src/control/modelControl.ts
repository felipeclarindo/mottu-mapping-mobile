import { useState, useCallback } from "react";
import { modelService } from "../service/modelService";
import { ModelDTO } from "../model/MotoModel";

export function useModelControl() {
  const [models, setModels] = useState<ModelDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadModels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await modelService.getAllModels();
      setModels(data);
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar modelos");
    } finally {
      setLoading(false);
    }
  }, []);

  return { models, loading, error, loadModels };
}
