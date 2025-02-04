import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState<boolean>();

    function handleClick() {
        setIsOpen(!isOpen);
    }

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {!isOpen && (
                <div
                    className="p-2 w-8 h-8 mt-4 me-4 space-y-1 sm:px-2 sm:py-3 sm:w-12 sm:h-12 sm:mt-4 sm:me-4 sm:space-y-2 bg-yellow-950 rounded shadow xl:hidden"
                    onClick={handleClick}
                >
                    <span className="block w-4 sm:w-8 h-0.5 bg-yellow-200 animate-pulse"></span>
                    <span className="block w-4 sm:w-8 h-0.5 bg-yellow-200 animate-pulse"></span>
                    <span className="block w-4 sm:w-8 h-0.5 bg-yellow-200 animate-pulse"></span>
                </div>
            )}
            {isOpen && (
                <HamburgerMenu openState={ isOpen} handleClose={handleClose}/>
            )}
        </>
    );
};

export default Hamburger;
