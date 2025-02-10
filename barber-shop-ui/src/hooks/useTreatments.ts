import { useQuery } from "@tanstack/react-query";

import { Treatment } from "../types/treatment";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchTreatments = async (): Promise<Treatment[]> => {
    const res = await fetch(`${BASE_URL}/treatments`);
    if (!res.ok) throw new Error('Failed to fetch treatments');
    return res.json();
}

export const useTreatments = () => {
    return useQuery({
        queryKey: ['treatments'],
        queryFn: fetchTreatments
    });
}