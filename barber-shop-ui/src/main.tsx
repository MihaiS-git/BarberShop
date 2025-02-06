import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/auth/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import {store} from './store/index.ts';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </AuthProvider>
);
