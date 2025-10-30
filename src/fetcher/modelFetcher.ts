import axios from 'axios';
import { Moto } from '../model/MotoModel';
import { mottuMappingApi } from './api';

export const fetchMotoModels = async (): Promise<Moto[] | null> => {
    try {
        const response = await mottuMappingApi.get<Moto[]>('/moto-models');
        const data = response.data;
        if (!data) return [];
        return Object.entries(data).map(([key, value]) => {
            const moto = value as Moto;
            return { ...moto, id: key };
        });
    } catch (error) {
        console.error("Error fetching moto models:", error);
        return null;
    }
}