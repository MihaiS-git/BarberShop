export interface AuthState {
    isAuthenticated: boolean;
    userId: string | null 
    jwtToken: string | null;
    role: string | null;
}

export interface AuthContextType {
    authState: AuthState;
    login: (userId: string, jwtToken: string, role: string) => void;
    logout: () => void;
}
