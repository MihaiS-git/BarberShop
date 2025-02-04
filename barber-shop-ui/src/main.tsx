import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/auth/AuthProvider.tsx";
import TreatmentsProvider from "./contexts/treatments/TreatmentsProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <TreatmentsProvider>
            <App />
        </TreatmentsProvider>
    </AuthProvider>
);
