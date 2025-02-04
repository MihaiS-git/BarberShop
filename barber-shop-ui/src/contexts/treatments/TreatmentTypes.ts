export interface Treatment {
    id: string;
    name: string;
    description: string;
    duration: number; // in minutes
    price: number;
    pictureUrl: string;
    barberIds: string[];
}

export interface TreatmentsContextType {
    treatments: Treatment[];
    isLoading: boolean;
    error: string | null;
    fetchTreatments: () => Promise<void>;
/*     createTreatment: (newTreatment: Treatment) => Promise<void>;
    updateTreatment: (updatedTreatment: Treatment) => Promise<void>;
    deleteTreatment: (id: string) => Promise<void>; */
}

