import { NavLink } from "react-router-dom";

const MenuElement: React.FC<{
    name: string;
    target: string;
    className: string;
    onClick?: () => void;
}> = ({ name, target, className, onClick }) => {
    return (
        <li>
            <NavLink className={className} to={target} onClick={onClick}>
                {name}
            </NavLink>
        </li>
    );
};

export default MenuElement;
