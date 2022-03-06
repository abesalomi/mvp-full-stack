import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import productManagerReducer from '../feature/product-manager/productManagerSlice';

export const store = configureStore({
  reducer: {
    productManager: productManagerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
