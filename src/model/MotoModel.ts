import { InferType, object, string, number } from "yup";
import { ModelDTO } from "./ModelModel";
import { SectorDTO } from "./SectorModel";

const motoSchema = object({
  motorcycleId: number().nullable(),
  plate: string().required("Plate is required"),
  coordinates: string().required("Coordinates are required"),
  modelId: number().required("Model is required"),
  sectorId: number().required("Sector is required"),
});

type Moto = InferType<typeof motoSchema>;

type CountSectorDTO = {
  sectorName: string;
  motoCount: number;
};

type MotoResponse = {
  motorcycleId: number;
  plate: string;
  coordinates: string;
  sector: SectorDTO;
  model: ModelDTO;
};

type MotoPage = {
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

export { motoSchema, type Moto, type MotoError, MotoPage, MotoResponse, CountSectorDTO};
