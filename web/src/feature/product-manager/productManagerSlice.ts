import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpAddProducts, httpDeleteProducts, httpGetProducts, httpUpdateProducts } from '../../services/products';
import { Product, ProductUpdateRequest } from '../../model/product';
import { RootState } from '../../app/store';

interface ProductState<E> {
  loading: boolean;
  isError: boolean;
  success: boolean;
  product: Product | null;
  errorMessage: E,
}

interface AddState {
  loading: boolean;
  isError: boolean;
  success: boolean;
  showModal: boolean;
  errorMessage: string[],
}

export interface ProductManagerState {
  loading: boolean;
  isError: boolean;
  products: Product[];
  delete: ProductState<string>;
  edit: ProductState<string[]>;
  add: AddState
}


const initialState: ProductManagerState = {
  loading: false,
  isError: false,
  products: [],
  delete: {
    isError: false,
    loading: false,
    success: false,
    product: null,
    errorMessage: '',
  },
  edit: {
    isError: false,
    loading: false,
    success: false,
    product: null,
    errorMessage: [],
  },
  add: {
    isError: false,
    loading: false,
    success: false,
    showModal: false,
    errorMessage: [],
  }
};


export const getProductForSeller = createAsyncThunk(
  'product-manager/get',
  async (userId?: number) => {
    return await httpGetProducts(userId);
  },
);


export const deleteProduct = createAsyncThunk(
  'product-manager/delete',
  async (productId: number) => {
    return await httpDeleteProducts(productId);
  },
);
export const editProduct = createAsyncThunk(
  'product-manager/edit',
  async ({productId, product}: { productId: number, product: ProductUpdateRequest }, {rejectWithValue}) => {
    try {
      return await httpUpdateProducts(productId, product);
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);
export const addProduct = createAsyncThunk(
  'product-manager/add',
  async (product: ProductUpdateRequest, {rejectWithValue}) => {
    try {
      return await httpAddProducts(product);
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);


export const productManagerSlice = createSlice({
  name: 'product-manager',
  initialState,
  reducers: {
    showProductAddModal: (state: ProductManagerState) => {
      state.add.showModal = true;
    },
    closeProductAddModal: (state: ProductManagerState) => {
      state.add.showModal = false;
      state.add.errorMessage = [];
    },
    confirmDeleteProduct: (state: ProductManagerState, action: PayloadAction<Product>) => {
      state.delete.product = action.payload;
    },
    disableDelete: (state: ProductManagerState) => {
      state.delete.product = null;
    },
    openProductEditModal: (state: ProductManagerState, action: PayloadAction<Product>) => {
      state.edit.product = action.payload;
    },
    closeProductEditModal: (state: ProductManagerState) => {
      state.edit.product = null;
      state.edit.errorMessage = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductForSeller.fulfilled, (state: ProductManagerState, action) => {
        state.loading = false;
        state.products = action.payload
      })
      .addCase(getProductForSeller.pending, (state: ProductManagerState) => {
        state.loading = true;
        state.products = [];
        state.isError = false;
      })
      .addCase(getProductForSeller.rejected, (state: ProductManagerState) => {
        state.loading = false;
        state.isError = true;
      })
      .addCase(deleteProduct.fulfilled, (state: ProductManagerState) => {
        state.delete.loading = false;
        state.delete.success = true;
      })
      .addCase(deleteProduct.pending, (state: ProductManagerState) => {
        state.delete.loading = true;
        state.delete.isError = false;
        state.delete.success = false;
        state.delete.errorMessage = '';
      })
      .addCase(deleteProduct.rejected, (state: ProductManagerState, action: any) => {
        state.delete.loading = false;
        state.delete.isError = true;
        state.delete.errorMessage = action?.error?.message;
      })
      .addCase(editProduct.fulfilled, (state: ProductManagerState) => {
        state.edit.loading = false;
        state.edit.success = true;
      })
      .addCase(editProduct.pending, (state: ProductManagerState) => {
        state.edit.loading = true;
        state.edit.isError = false;
        state.edit.success = false;
        state.edit.errorMessage = [];
      })
      .addCase(editProduct.rejected, (state: ProductManagerState, action: any) => {
        state.edit.loading = false;
        state.edit.isError = true;
        state.edit.errorMessage = Array.isArray(action?.payload?.message) ? action?.payload?.message : [action?.payload?.message];
      })
      .addCase(addProduct.fulfilled, (state: ProductManagerState) => {
        state.add.loading = false;
        state.add.success = true;
      })
      .addCase(addProduct.pending, (state: ProductManagerState) => {
        state.add.loading = true;
        state.add.isError = false;
        state.add.success = false;
        state.add.errorMessage = [];
      })
      .addCase(addProduct.rejected, (state: ProductManagerState, action: any) => {
        state.add.loading = false;
        state.add.isError = true;
        state.add.errorMessage = Array.isArray(action?.payload?.message) ? action?.payload?.message : [action?.payload?.message];
      })
  },
})

export const {
  confirmDeleteProduct,
  disableDelete,
  openProductEditModal,
  showProductAddModal,
  closeProductEditModal,
  closeProductAddModal
} = productManagerSlice.actions

export const selectProduct = (state: RootState) => state.productManager.products;
export const selectProductLoading = (state: RootState) => state.productManager.loading;
export const selectProductError = (state: RootState) => state.productManager.isError;
export const selectProductDeleteState = (state: RootState) => state.productManager.delete;
export const selectProductEditState = (state: RootState) => state.productManager.edit;
export const selectProductAddState = (state: RootState) => state.productManager.add;


export default productManagerSlice.reducer;
