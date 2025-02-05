import useAuth from "../../contexts/auth/useAuth";
import { Treatment } from "../../types/treatment";

const TreatmentCard: React.FC<{ treatment: Treatment }> = ({ treatment }) => {
    const { authState } = useAuth();
    
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(treatment.price);

    const handleAddToCart = () => { 

    };

    return (
        <div
            className="flex flex-col border border-slate-200 shadow-[2px_2px_6px] shadow-yellow-950 h-full text-clip bg-yellow-900 cursor-pointer"
            onClick={handleAddToCart}
        >
            <img
                src={`/${treatment.pictureUrl}`}
                alt={treatment.name}
                className="w-full h-120 object-cover rounded-t-lg"
            />
            <h3 className="font-semibold mt-4 mb-2 text-yellow-400 text-sm md:text-md lg:text-xl">
                {treatment.name}
            </h3>
            <hr className="m-2 text-yellow-400" />
            <p className="text-base text-yellow-400 mx-4 sm:text-md flex-grow">
                {treatment.description}
            </p>
            <hr className="m-2 text-yellow-400" />
            <p className="mx-auto text-base text-yellow-400 sm:text-md">
                <strong>Duration:</strong> {treatment.duration} mins
            </p>
            <hr className="m-2 text-yellow-400" />
            <p className="mx-auto text-base text-yellow-400 sm:text-md">
                <strong>Price:</strong> {formattedPrice}{" "}
            </p>
            {authState.isAuthenticated && (
                <button
                    onClick={handleAddToCart}
                    className="bg-yellow-400 text-yellow-950 text-base px-2 py-2 w-2/5 mx-auto my-4 cursor-pointer"
                >
                    Add To Cart
                </button>
            )}
        </div>
    );

}

export default TreatmentCard;