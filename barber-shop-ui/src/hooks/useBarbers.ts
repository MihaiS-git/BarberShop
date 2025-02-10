import { useQuery } from "@tanstack/react-query";

import { User } from '../types/user';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchBarbers = async (): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/barbers`);
    if (!res.ok) throw new Error('Failed to fetch barbers.');
    return res.json();
}

export const useBarbers = () => {
    return useQuery({
        queryKey: ['barbers'],
        queryFn: fetchBarbers
    });
}