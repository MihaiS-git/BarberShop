import { useState } from "react";
import { Treatment } from "./TreatmentTypes";
import { TreatmentsContext } from "./TreatmentsContext";

const BASE_URL = "http://localhost:8080";

const TreatmentsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTreatments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/treatments`);
            if (!response.ok) throw new Error("Failed to fetch treatments");
            const data = await response.json();
            setTreatments(data);
        } catch (err) {
            setError(err as string);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <TreatmentsContext.Provider
            value={{
                treatments,
                isLoading,
                error,
                fetchTreatments
            }}
        >
            {children}
        </TreatmentsContext.Provider>
    );
};

export default TreatmentsProvider;
