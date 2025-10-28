import { InferType, object, string, number } from 'yup';

// join entre moto, model, sector e patio (1L)
const motoSchema = object({
  id: string().required(),
  plate: string().required('A placa é obrigatória'),
  // modelName
  model: string().required('O modelo é obrigatório'),
  color: string().required('A cor é obrigatória'),
  // sectorDescription
  sectorName: string().required(),
  // sectorColor
  setorColorRgb: string().required(),
});

type Moto = InferType<typeof motoSchema>;

interface MotoError {
  plate?: string;
  model?: string;
  color?: string;
  sectorName: string;
  sectorColorRgb: string;
}

export { motoSchema, Moto, MotoError };
