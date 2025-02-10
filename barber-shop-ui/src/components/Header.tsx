import { Link } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Hamburger from "./Hamburger";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-yellow-200 z-10 flex justify-between align-middle">
            <Link to="#/home" className="w-3/4 lg:w-2/5">
                <h1 className="w-full py-6 px-8 font-bold text-yellow-950 hover:text-yellow-600 text-2xl sm:text-3xl lg:text-4xl cursor-pointer">
                    Barber Shop
                </h1>
            </Link>
            <MainNavigation />
            <Hamburger />
        </header>
    );
}

export default Header;