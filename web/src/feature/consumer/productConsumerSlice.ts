import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpGetProducts } from '../../services/products';
import { Product } from '../../model/product';
import { RootState } from '../../app/store';
import { httpBuy } from '../../services/machine';
import { BuyRequest } from '../../model/buy';


interface ConfirmBuy {
  product: Product;
  amount: number;
}

interface Buy {
  loading: boolean;
  isError: boolean;
  success: boolean;
  errorMessage: string;
}


export interface ProductConsumerState {
  loading: boolean;
  isError: boolean;
  products: Product[];
  confirmBuy: ConfirmBuy | null;
  buy: Buy
}


const initialState: ProductConsumerState = {
  loading: false,
  isError: false,
  products: [],
  confirmBuy: null,
  buy: {
    isError: false,
    loading: false,
    success: false,
    errorMessage: '',
  },
};


export const getProductForConsumer = createAsyncThunk(
  'product-consumer/get',
  async () => {
    return await httpGetProducts();
  },
);


export const buy = createAsyncThunk(
  'product-consumer/buy',
  async (buyRequest: BuyRequest, {rejectWithValue}) => {
    try {
      return await httpBuy(buyRequest);
    } catch (e: any) {
      return rejectWithValue(e.response.data)
    }
  },
);


export const productConsumerSlice = createSlice({
  name: 'product-conumer',
  initialState,
  reducers: {
    clearBuyStateError: (state: ProductConsumerState) => {
      state.buy.errorMessage = '';
      state.buy.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductForConsumer.fulfilled, (state: ProductConsumerState, action) => {
        state.loading = false;
        state.products = action.payload
      })
      .addCase(getProductForConsumer.pending, (state: ProductConsumerState) => {
        state.loading = true;
        state.products = [];
        state.isError = false;
      })
      .addCase(getProductForConsumer.rejected, (state: ProductConsumerState) => {
        state.loading = false;
        state.isError = true;
      })
      .addCase(buy.pending, (state: ProductConsumerState) => {
        state.buy.loading = true;
        state.buy.success = false;
        state.buy.isError = false;
      })
      .addCase(buy.fulfilled, (state: ProductConsumerState, action) => {
        state.buy.loading = false;
        state.buy.success = true;
      })
      .addCase(buy.rejected, (state: ProductConsumerState, action: any) => {
        state.buy.loading = false;
        state.buy.isError = true;
        state.buy.errorMessage = action.payload?.message
      });
  },
})

export const {
  clearBuyStateError
} = productConsumerSlice.actions

export const selectProductForConsumer = (state: RootState) => state.consumer.products;
export const selectProductLoadingForConsumer = (state: RootState) => state.consumer.loading;
export const selectProductErrorForConsumer = (state: RootState) => state.consumer.isError;
export const selectBuyState = (state: RootState) => state.consumer.buy;


export default productConsumerSlice.reducer;
