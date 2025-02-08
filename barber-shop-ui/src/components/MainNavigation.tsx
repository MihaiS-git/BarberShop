import { useNavigate } from "react-router-dom";

import useAuth from "../contexts/auth/useAuth";
import MenuElement from "./MenuElement";

const MainNavigation = () => {
    const { authState, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="hidden xl:block w-full bg-yellow-200 p-2">
            <ul className="flex flex-row justify-around items-center w-full h-full">
                <MenuElement
                    name="Treatments"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/treatments"
                />
                <MenuElement
                    name="Barbers"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/barbers"
                />
                {authState.isAuthenticated && (
                    <MenuElement
                        name="Appointments"
                        className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                        target="/appointments"
                    />
                )}
                {authState.isAuthenticated && (
                    <MenuElement
                        name="Cart"
                        className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                        target="/cart"
                    />
                )}
                {authState.isAuthenticated && (
                    <MenuElement
                        name="Account"
                        className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                        target="/account"
                    />
                )}
                
                <MenuElement
                    name="Contact"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/contact"
                />

                {authState.isAuthenticated ? (
                    <button
                        className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <MenuElement
                        name="Authenticate"
                        className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                        target="/login"
                    />
                )}
            </ul>
        </nav>
    );
};

export default MainNavigation;
