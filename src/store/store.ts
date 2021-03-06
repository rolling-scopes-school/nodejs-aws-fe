import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'store/counterSlice';
import cartReducer from 'store/cartSlice';
import themeReducer from 'store/themeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
