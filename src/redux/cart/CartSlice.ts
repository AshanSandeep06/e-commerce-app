import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartState, CartItem} from './CartTypes';

const initialState: CartState = {
    items: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
            state.totalAmount += action.payload.price;
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload);
            if (existingItemIndex >= 0) {
                const itemPrice = state.items[existingItemIndex].price;
                const itemQuantity = state.items[existingItemIndex].quantity;
                state.items.splice(existingItemIndex, 1);
                state.totalAmount -= itemPrice * itemQuantity;
            }
        },
        updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const {id, quantity} = action.payload;
            const existingItemIndex = state.items.findIndex((item) => item.id === id);
            if (existingItemIndex >= 0) {
                const oldQuantity = state.items[existingItemIndex].quantity;
                state.items[existingItemIndex].quantity = quantity;
                const priceDifference = state.items[existingItemIndex].price * (quantity - oldQuantity);
                state.totalAmount += priceDifference;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {addItemToCart, removeItemFromCart, updateItemQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;