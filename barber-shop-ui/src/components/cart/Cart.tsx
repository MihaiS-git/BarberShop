import { useSelector, useDispatch } from "react-redux";

import useAuth from "../../contexts/auth/useAuth";

import { CartItem } from "../../types/cartItem";
import ItemCard from "./ItemCard";

import { clearCart } from "../../store/cart-slice";
import { saveAppointment } from "../../store/appointment-slice";
import { formatPrice } from "../../utils/formatPrice";

import type { AppDispatch } from "../../store";
import type { Appointment } from "../../types/appointment";
import { ApprovalStatus } from "../../types/approvalStatus";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
    const [dateAndTime, setDateAndTime] = useState(null);
    const { items, totalPrice } = useSelector(
        (state: { cart: { items: CartItem[]; totalPrice: number } }) =>
            state.cart
    );
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { authState } = useAuth();

    const handleDatePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateAndTime(e.target.value);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleClose = () => {
        navigate("/home");
    };

    const handleBookNow = () => {
        const treatmentIds: string[] = [];
        const barberIds: string[] = [];
        let duration = 0;
        let totalPrice = 0;

        items.forEach((item) => {
            treatmentIds.push(item._id);
            barberIds.push(item.barberIds[0]);
            duration += item.duration;
            totalPrice += item.price;
        });

        const appointment: Appointment = {
            _id: "",
            customerId: authState.userId,
            barberIds,
            treatmentIds,
            startDateTime: new Date(dateAndTime)
                .toISOString()
                .replace("T", " ")
                .slice(0, 19),
            duration,
            totalPrice,
            approvalStatus: ApprovalStatus.PENDING,
        };

        dispatch(
            saveAppointment({
                requestBody: appointment,
                jwtToken: authState.jwtToken,
            })
        );

        dispatch(clearCart());
        navigate("/home");
    };

    return (
        <div className="flex flex-col align-middle w-full min-h-screen md:px-24 overflow-auto">
            <div className="bg-yellow-500 bg-opacity-60 mb-10 w-64 sm:w-96 mx-auto text-center text-2xl sm:text-3xl">
                <h2>Cart</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 p-2">
                <div className="bg-yellow-400  text-yellow-950 lg:col-span-2 h-full flex flex-col justify-center items-center">
                    <h3 className="m-2 md:p-2 text-xl font-bold">Items</h3>
                    {items.length > 0 ? (
                        <ul className="w-11/12 sm:w-10/12 xl:w-8/12">
                            {items.map((item, index) => (
                                <li key={index}>
                                    <ItemCard item={item} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-yellow-900 font-bold text-lg p-8">
                                Your cart is empty, maybe add some products!
                            </p>
                        </div>
                    )}
                </div>

                <div>
                    <div className="bg-yellow-700  text-yellow-400 p-4 flex flex-col justify-center align-middle text-center">
                        <h3 className="md:p-2 text-xl font-bold">
                            Pick a date
                        </h3>
                        <div className="flex flex-row align-middle justify-between">
                            <input
                                type="datetime-local"
                                className="bg-yellow-50 text-yellow-950 w-4/5 mx-auto"
                                name="dateAndTime"
                                onChange={handleDatePicker}
                                required
                            />
                        </div>
                    </div>

                    <div className="bg-yellow-950  text-yellow-400 px-8 py-4 flex flex-col justify-center align-middle text-center">
                        <h3 className="m-2 md:p-2 text-xl font-bold">
                            Order Details
                        </h3>
                        <div className="flex flex-row align-middle justify-between md:py-1">
                            <p>Services:</p>
                            <p>{formatPrice(totalPrice * 0.81)}</p>
                        </div>
                        <div className="flex flex-row align-middle justify-between md:py-1">
                            <p>VAT:</p>
                            <p>{formatPrice(totalPrice * 0.19)}</p>
                        </div>
                        <hr className="m-2" />
                        <div className="flex flex-row align-middle justify-between md:py-1">
                            <p className="font-bold md:text-xl">Total</p>
                            <p className="font-bold md:text-xl">
                                {formatPrice(totalPrice)}
                            </p>
                        </div>
                        <div className="mx-auto my-2 text-center grid grid-cols-2">
                            <button
                                className="mx-2 p-1 bg-yellow-400 hover:bg-yellow-900 text-yellow-900 hover:text-yellow-400 text-lg cursor-pointer"
                                onClick={handleBookNow}
                            >
                                Book Now
                            </button>
                            <button
                                className="mx-2 p-1 bg-yellow-400 hover:bg-yellow-900 text-yellow-900 hover:text-yellow-400 text-lg cursor-pointer"
                                onClick={handleClearCart}
                            >
                                Delete
                            </button>
                        </div>
                        <div className="flex flex-col justify-end items-end align-bottom">
                            <button
                                type="button"
                                className="p-1 w-7 h-7 bg-yellow-400 hover:bg-yellow-900 text-yellow-900 hover:text-yellow-400 text-sm cursor-pointer"
                                onClick={handleClose}
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
