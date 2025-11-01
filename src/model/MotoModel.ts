import { InferType, object, string, number } from "yup";

const motoSchema = object({
  motorcycleId: number().nullable(),
  plate: string().required("Plate is required"),
  coordinates: string().required("Coordinates are required"),
  modelId: number().required("Model is required"),
  sectorId: number().required("Sector is required"),
});

type Moto = InferType<typeof motoSchema>;

export type CountSectorDTO = {
  sectorName: string;
  motoCount: number;
};

export type SectorDTO = {
  sectorId: number;
  name: string;
  description: string;
  colorRgb: string;
};

export type ModelDTO = {
  modelId: number;
  modelName: string;
};

export type MotoResponse = {
  motorcycleId: number;
  plate: string;
  coordinates: string;
  sector: SectorDTO;
  model: ModelDTO;
};

export type MotoPage = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: MotoResponse[];
  number: number;
  sort: any;
  numberOfElements: number;
  pageable: any;
  empty: boolean;
};

interface MotoError {
  plate?: string;
  coordinates?: string;
  modelId?: string;
  sectorId?: string;
}

export { motoSchema, type Moto, type MotoError };
