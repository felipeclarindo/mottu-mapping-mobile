import { InferType, object, string, number } from "yup";

const motoSchema = object({
  motorcycleId: number().nullable(),
  plate: string().required("Plate is required"),
  coordinates: string().required("Coordinates are required"),
  modelId: number().required("Model is required"),
  sectorId: number().required("Sector is required"),
});

type Moto = InferType<typeof motoSchema>;

interface MotoError {
  plate?: string;
  coordinates?: string;
  modelId?: string;
  sectorId?: string;
}

export { motoSchema, type Moto, type MotoError };