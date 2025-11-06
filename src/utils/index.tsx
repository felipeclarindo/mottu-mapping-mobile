import { CountSectorDTO } from "../model/MotoModel";
import i18n from "../i18n/i18n";

const normalize = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "");

export const generateReport = (sectorCounts: CountSectorDTO[] = []): string => {
  const totalMotos = sectorCounts.reduce(
    (sum, s) => sum + (s.motoCount || 0),
    0
  );
  const setores = sectorCounts
    .map((s) => {
      const key = normalize(s.sectorName);
      const translated =
        i18n.t(`home.sectors.${key}`) !== `home.sectors.${key}`
          ? i18n.t(`home.sectors.${key}`)
          : i18n.t(`patio.sectors.${key}`) !== `patio.sectors.${key}`
          ? i18n.t(`patio.sectors.${key}`)
          : s.sectorName;
      return `  - ${translated}: ${s.motoCount} ${i18n.t("moto", {
        count: s.motoCount,
      })}`;
    })
    .join("\n");
  return `${
    i18n.t("report.titleHeader") || "Relatório de Mapeamento do Pátio"
  }\n${i18n.t("report.date") || "Data"}: ${new Date().toLocaleString()}\n\n${
    i18n.t("report.totalMotos") || "Número total de motos"
  }: ${totalMotos}\n\n${
    i18n.t("report.detailsBySector") || "Detalhes por Setor"
  }:\n${setores}\n\n${i18n.t("report.observations") || "Observações"}: ${
    i18n.t("report.success") || "Pátio mapeado com sucesso."
  }`;
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
    .map((s) => {
      const key = normalize(s.sectorName);
      const translated =
        i18n.t(`home.sectors.${key}`) !== `home.sectors.${key}`
          ? i18n.t(`home.sectors.${key}`)
          : i18n.t(`patio.sectors.${key}`) !== `patio.sectors.${key}`
          ? i18n.t(`patio.sectors.${key}`)
          : s.sectorName;
      return `  - ${translated}: ${s.motoCount} ${i18n.t("moto", {
        count: s.motoCount,
      })}`;
    })
    .join("\n");
  return `${
    i18n.t("report.fullTitle") || "Relatório Completo de Mapeamento do Pátio"
  }\n${i18n.t("report.date") || "Data"}: ${new Date().toLocaleString()}\n\n${
    i18n.t("report.generalInfo") || "Informações Gerais"
  }\n-------------------\n${
    i18n.t("report.totalMotos") || "Número total de motos"
  }: ${totalMotos}\n${
    i18n.t("report.area") || "Área total do pátio"
  }: 1000 m²\n${
    i18n.t("report.capacity") || "Capacidade máxima de motos"
  }: 500\n\n${
    i18n.t("report.detailsBySector") || "Detalhes por Setor"
  }\n-------------------\n${setores}\n\n${
    i18n.t("report.observations") || "Observações"
  }\n----------\n${i18n.t("report.success") || "Pátio mapeado com sucesso."}`;
};
