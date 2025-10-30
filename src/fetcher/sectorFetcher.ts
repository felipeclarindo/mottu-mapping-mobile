import axios from 'axios';
import { Moto } from '../model/MotoModel';
import { mottuMappingApi } from './api';

// fetch sectors by yard (1L)
export const fetchSectorsByYard = async (): Promise<Moto[] | null> => {
    try {
                                                        // rever endpoint
        const response = await mottuMappingApi.get<Moto[]>('/sectors?yard=1L');
        const data = response.data;
        if (!data) return [];
        return Object.entries(data).map(([key, value]) => {
            const moto = value as Moto;
            return { ...moto, id: key };
        });
    } catch (error) {
        console.error("Error fetching sectors by yard:", error);
        return null;
    }
}