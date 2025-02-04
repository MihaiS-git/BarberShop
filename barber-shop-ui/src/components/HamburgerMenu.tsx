import { useNavigate } from "react-router-dom";

import useAuth from "../contexts/auth/useAuth";
import MenuElement from "./MenuElement";

const HamburgerMenu: React.FC<{openState: boolean; handleClose: () => void;}> = ({ openState, handleClose }) => {
    const { authState, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
        handleClose();
    };

    return (
        <>
            <div
                className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full p-6 bg-yellow-200 rounded-md shadow-lg z-50 
                    ${openState ? "block" : "hidden"}`}
            >
                <ul className="flex flex-col justify-around items-center w-full h-full">
                    <MenuElement
                        name="Treatments"
                        className="block w-full p-2 text-center text-lg font-bold text-yellow-900 hover:text-stone-950"
                        target="/treatments"
                        onClick={handleClose}
                    />
                    <MenuElement
                        name="Professionals"
                        className="block w-full p-2 text-center text-lg font-bold text-yellow-900 hover:text-stone-950"
                        target="/professionals"
                        onClick={handleClose}
                    />
                    <MenuElement
                        name="Appointments"
                        className="block w-full p-2 text-center text-lg font-bold text-yellow-900 hover:text-stone-950"
                        target="/appointments"
                    />
                    <MenuElement
                        name="Cart"
                        className="block w-full p-2 text-center text-lg font-bold text-yellow-900 hover:text-stone-950"
                        target="/cart"
                        onClick={handleClose}
                    />
                    <MenuElement
                        name="Account"
                        className="block w-full p-2 text-center text-lg font-bold text-yellow-900 hover:text-stone-950"
                        target="/myAccount"
                        onClick={handleClose}
                    />
                    <MenuElement
                        name="Contact"
                        className="block w-full p-2 text-center text-lg font-bold text-yellow-900 hover:text-stone-950"
                        target="/contact"
                        onClick={handleClose}
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
                            onClick={handleClose}
                        />
                    )}
                </ul>
                <div className="flex justify-end align-bottom">
                    <button
                        onClick={handleClose}
                        className="ps-2 pe-2 rounded-md text-xl text-yellow-400 font-bold bg-yellow-950"
                    >
                        X
                    </button>
                </div>
            </div>
        </>
    );
};

export default HamburgerMenu;
