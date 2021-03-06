/* eslint-disable no-param-reassign */
import {
    createSlice, Dispatch, PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItem } from 'models/CartItem';
import { Product } from 'models/Product';
import { RootState } from 'store/store';

import API_PATHS from '../constants/apiPaths';

interface CartState {
    items: CartItem[];
}

export interface GlobalStateWithCart {
    cart: CartState;
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateFromApi: (_state, { payload: { items } }: PayloadAction<CartState>) => ({
            items: [...items],
        }),
        addToCart: (state, action: PayloadAction<Product>) => {
            const { items } = state;
            const { payload: product } = action;
            const existingItem = items.find((i) => i.product.id === product.id);

            if (existingItem) {
                existingItem.count++;

                return;
            }
            items.push({ product, count: 1 });
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            const { items } = state;
            const { payload: product } = action;
            const existingItem = items.find((i) => i.product.id === product.id);

            if (!existingItem) return;
            if (existingItem.count > 1) {
                existingItem.count--;

                return;
            }
            state.items = items.filter((i) => i.product.id !== product.id);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});
export const cartReducer = cartSlice.reducer;

/* ACTIONS */

export const addToCart = (
    product: Product,
) => async (
    dispatch: Dispatch,
    getState: () => GlobalStateWithCart,
) => {
    dispatch(cartSlice.actions.addToCart(product));
    const { cart: { items } } = getState();

    await axios.put(`${API_PATHS.cart}/profile/cart`, { items }, {
        headers: {
            Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
        },
    });
};

export const removeFromCart = (
    product: Product,
) => async (
    dispatch: Dispatch,
    getState: () => GlobalStateWithCart,
) => {
    dispatch(cartSlice.actions.removeFromCart(product));
    const { cart: { items } } = getState();

    await axios.put(`${API_PATHS.cart}/profile/cart`, { items }, {
        headers: {
            Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
        },
    });
};

export const clearCart = () => async (
    dispatch: Dispatch,
    getState: () => GlobalStateWithCart,
) => {
    dispatch(cartSlice.actions.clearCart());
    const { cart: { items } } = getState();

    await axios.put(`${API_PATHS.cart}/profile/cart`, { items }, {
        headers: {
            Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
        },
    });
};

export const { updateFromApi } = cartSlice.actions;

/* SELECTORS */

export const selectCartItems = (state: RootState) => state.cart.items;
