import MenuElement from "./MenuElement";

const MainNavigation = () => {
    return (
        <nav className="hidden xl:block w-full bg-yellow-200 p-2">
            <ul className="flex flex-row justify-around items-center w-full h-full">
                <MenuElement
                    name="Treatments"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/treatments"
                />
                <MenuElement
                    name="Professionals"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/professionals"
                />
                <MenuElement
                    name="Appointments"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/appointments"
                />
                <MenuElement
                    name="Cart"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/cart"
                />
                <MenuElement
                    name="Account"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/myAccount"
                />
                <MenuElement
                    name="Contact"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/contact"
                />
                <MenuElement
                    name="Authentication"
                    className="block w-full p-2 text-center text-xl font-bold text-yellow-900 hover:text-stone-950"
                    target="/auth"
                />
            </ul>
        </nav>
    );
};

export default MainNavigation;
