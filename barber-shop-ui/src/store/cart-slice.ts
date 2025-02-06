import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/cartItem";

interface CartState{
    items: CartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find((i) => i._id === newItem._id);
            if (!existingItem) {   
                state.items.push(newItem);
                state.totalPrice += newItem.price;
            }
        },
        removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
            const itemIndex = state.items.findIndex((item) => item._id === action.payload._id);
            if (itemIndex !== -1) {
                state.totalPrice -= state.items[itemIndex].price;
                state.items.splice(itemIndex, 1);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;