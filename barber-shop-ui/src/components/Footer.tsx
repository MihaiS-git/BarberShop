import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full text-base text-yellow-950 text-center bg-yellow-200 p-4 font-extrabold">
            <p>
                <Link to="https://mihais-git.github.io/">
                    Mihai Suciu @ 2025
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
