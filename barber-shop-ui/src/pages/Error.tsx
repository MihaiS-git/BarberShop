import { Link } from "react-router-dom";
import PageContent from "../components/PageContent";

const ErrorPage = () => {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto px-6 py-24 w-12/12 lg:w-8/12 bg-yellow-100 bg-opacity-50">
            <div className="flex flex-col justify-center items-center h-screen text-center">
                <h1 className="text-2xl lg:text-4xl font-bold text-red-600">
                    Oops! Page Not Found
                </h1>
                <p className="mt-4 text-xl">
                    The page you're looking for doesn't exist.
                </p>
                <Link to="/" className="mt-6 text-blue-500 hover:underline">
                    Go back to the home page
                </Link>
            </div>
        </PageContent>
    );
};

export default ErrorPage;
