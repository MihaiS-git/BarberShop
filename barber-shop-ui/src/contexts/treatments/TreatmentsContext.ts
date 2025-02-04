import { createContext } from "react";
import { TreatmentsContextType } from "./TreatmentTypes";

export const TreatmentsContext = createContext<TreatmentsContextType | undefined>(undefined);