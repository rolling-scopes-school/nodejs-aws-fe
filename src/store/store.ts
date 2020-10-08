import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'store/counterSlice';
import cartReducer from 'store/cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
