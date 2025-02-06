import { useDispatch } from "react-redux";
import { CartItem } from "../../types/cartItem";
import { removeFromCart } from "../../store/cart-slice";

const ItemCard: React.FC<{ item: CartItem }> = ({ item }) => {
    const dispatch = useDispatch();

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(item.price);

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({ _id: item._id }));
    };

    return (
        <div className="flex flex-row justify-between items-center text-center m-2 my-4 shadow-[2px_2px_6px] shadow-yellow-950 bg-yellow-900">
            <img
                src={`/${item.pictureUrl}`}
                alt={item.name}
                className="w-15 h-15 lg:w-30 lg:h-30"
            />
            <div className="flex flex-row justify-between w-full sm:mx-4 md:mx-12">
                <p className="font-semibold m-2 mb-2 text-yellow-400 text-sm md:text-md lg:text-xl">
                    {item.name}
                </p>
                <p className="m-2 text-yellow-400 text-sm md:text-md lg:text-xl">
                    {formattedPrice}
                </p>
            </div>
            <button
                type="button"
                className="bg-yellow-950 text-yellow-200 hover:bg-yellow-200 hover:text-yellow-950 w-5 h-5 md:w-10 md:h-10 text-xs md:text-base me-4 cursor-pointer"
                onClick={handleRemoveFromCart}
            >
                X
            </button>
        </div>
    );
};

export default ItemCard;
