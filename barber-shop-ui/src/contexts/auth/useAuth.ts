import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { AuthContextType } from './AuthTypes';

const useAuth = (): AuthContextType => {
    console.log("useAuth called");
    
    const context = useContext(AuthContext);
    console.log("useAuth context established");
    
    if (!context) {
        console.log("Error establishing the context");
        
        throw new Error("useAuth must be used within an AuthProvider");
    }
    console.log("No error establishing the useAuth context, return context");
    
    return context;
};

export default useAuth;
