import { useContext } from "react";
import { TreatmentsContext } from "./TreatmentsContext";

const useTreatments = () => {
    const context = useContext(TreatmentsContext);
    if (!context) {
        throw new Error("useTreatments must be used within an TreatmentsProvider");
    }
    return context;
};

export default useTreatments;