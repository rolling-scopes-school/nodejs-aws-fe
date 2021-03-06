import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { cartReducer, GlobalStateWithCart } from 'store/cartSlice';

export const store = configureStore<GlobalStateWithCart>({
    reducer: {
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
