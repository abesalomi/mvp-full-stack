import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import productManagerReducer from '../feature/product-manager/productManagerSlice';
import productConsumerReducer from '../feature/consumer/productConsumerSlice';
import depositReducer from '../feature/deposit/depositSlice';

export const store = configureStore({
  reducer: {
    productManager: productManagerReducer,
    consumer: productConsumerReducer,
    deposit: depositReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
