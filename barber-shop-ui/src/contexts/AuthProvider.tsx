import { ReactNode, useEffect, useState } from "react";
import { AuthState } from "./AuthTypes";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        userId: null,
        jwtToken: null,
        role: null,
    });

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) return;

        const parsedUser = JSON.parse(user);

        if (!parsedUser?.userId || !parsedUser?.jwtToken || !parsedUser?.role)
            return;

        try {
            const decodedToken = jwtDecode(parsedUser.jwtToken);
            const currentTime = Date.now() / 1000;
            const isTokenExpired = decodedToken.exp ? decodedToken.exp < currentTime : true;

            if (isTokenExpired) {
                localStorage.removeItem("user");
                return setAuthState({
                    isAuthenticated: false,
                    userId: null,
                    jwtToken: null,
                    role: null,
                });
            } else if (
                !authState.isAuthenticated ||
                authState.userId !== parsedUser.userId ||
                authState.jwtToken !== parsedUser.jwtToken ||
                authState.role !== parsedUser.role
            ) {
                setAuthState({
                    isAuthenticated: true,
                    userId: parsedUser.userId,
                    jwtToken: parsedUser.jwtToken,
                    role: parsedUser.role,
                });
            }
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem("user");
            setAuthState({
                isAuthenticated: false,
                userId: null,
                jwtToken: null,
                role: null,
            });
        }
    }, []);

    const login = (userId: string, jwtToken: string, role: string) => {
        localStorage.setItem(
            "user",
            JSON.stringify({ userId, jwtToken, role })
        );

        setAuthState({
            isAuthenticated: true,
            userId,
            jwtToken,
            role,
        });
    };

    const logout = () => {
        localStorage.removeItem("user");
        setAuthState({
            isAuthenticated: false,
            userId: null,
            jwtToken: null,
            role: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
