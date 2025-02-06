import ItemCard from "./ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../types/cartItem";
import { formatPrice } from "../../utils/formatPrice";
import { clearCart } from "../../store/cart-slice";

const Cart = () => {
    const { items, totalPrice } = useSelector(
        (state: { cart: { items: CartItem[]; totalPrice: number } }) =>
            state.cart
    );
    const dispatch = useDispatch();

    const handleBookNow = () => {
        alert("Appointment booked!");
        dispatch(clearCart());
    };

    return (
        <div className="flex flex-col align-middle w-full h-full">
            <div className="bg-yellow-500 bg-opacity-60 mb-10 w-64 sm:w-96 mx-auto text-center text-2xl sm:text-3xl">
                <h2>Cart</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-yellow-400  text-yellow-950 lg:col-span-2">
                    <h3 className="m-2 ms-8 md:p-2 text-xl font-bold">Items</h3>
                    {items && (
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    <ItemCard item={item} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="bg-yellow-950  text-yellow-400 flex flex-col justify-between p-2 lg:p-4 xl:p-16">
                    <div className="my-auto">
                        <h3 className="ms-8 lg:mb-6 text-xl font-bold">
                            Order Details
                        </h3>
                        <div className="flex flex-row align-middle justify-between md:py-2">
                            <p>Services price:</p>
                            <p>{formatPrice(totalPrice * 0.81)}</p>
                        </div>
                        <div className="flex flex-row align-middle justify-between md:py-2">
                            <p>VAT:</p>
                            <p>{formatPrice(totalPrice * 0.19)}</p>
                        </div>
                        <hr className="m-2" />
                        <div className="flex flex-row align-middle justify-between md:py-2">
                            <p className="font-bold md:text-xl">Total</p>
                            <p className="font-bold md:text-xl">
                                {formatPrice(totalPrice)}
                            </p>
                        </div>
                        <div className="mx-auto mb-2 text-center">
                            <button
                                className="p-2 bg-yellow-400 hover:bg-yellow-900 text-yellow-900 hover:text-yellow-400 text-lg cursor-pointer"
                                onClick={handleBookNow}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
