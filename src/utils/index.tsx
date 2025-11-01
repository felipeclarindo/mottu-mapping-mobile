import { CountSectorDTO } from "../model/MotoModel";

export const generateReport = (sectorCounts: CountSectorDTO[] = []): string => {
  const totalMotos = sectorCounts.reduce(
    (sum, s) => sum + (s.motoCount || 0),
    0
  );
  const setores = sectorCounts
    .map(
      (s) =>
        `  - ${s.sectorName}: ${s.motoCount} moto${
          s.motoCount === 1 ? "" : "s"
        }`
    )
    .join("\n");
  return `Relatório de Mapeamento do Pátio\nData: ${new Date().toLocaleString()}\n\nNúmero total de motos: ${totalMotos}\n\nDetalhes por Setor:\n${setores}\n\nObservações: Pátio mapeado com sucesso.`;
};

export const generateCompleteReport = (
  sectorCounts: CountSectorDTO[] = [],
  extra?: { area?: string; capacidade?: string }
) => {
  const totalMotos = sectorCounts.reduce(
    (sum, s) => sum + (s.motoCount || 0),
    0
  );
  const setores = sectorCounts
    .map(
      (s) =>
        `  - ${s.sectorName}: ${s.motoCount} moto${
          s.motoCount === 1 ? "" : "s"
        }`
    )
    .join("\n");
  return `Relatório Completo de Mapeamento do Pátio\nData: ${new Date().toLocaleString()}\n\nInformações Gerais\n-------------------\nNúmero total de motos: ${totalMotos}\nÁrea total do pátio: 1000 m²\nCapacidade máxima de motos: 500\n\nDetalhes por Setor\n-------------------\n${setores}\n\nObservações\n----------\nPátio mapeado com sucesso.`;
};
