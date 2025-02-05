import { useQuery } from "@tanstack/react-query";

import { User } from '../types/user';

const BASE_URL = 'http://localhost:8080';

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