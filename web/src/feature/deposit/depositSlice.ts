import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { httpAddDeposit, httpGetDeposit, httpResetDeposit } from '../../services/machine';

export interface DepositState {
  loading: boolean;
  isError: boolean;
  success: boolean;
  deposit: number;
  errorMessages: string[];
}


const initialState: DepositState = {
  loading: false,
  isError: false,
  success: false,
  deposit: 0,
  errorMessages: [],
};


export const getDeposit = createAsyncThunk(
  'deposit/get',
  async (_,{rejectWithValue}) => {
    try {
      return await httpGetDeposit();
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);
export const addDeposit = createAsyncThunk(
  'deposit/add',
  async (deposit: number,{rejectWithValue}) => {
    try {
      return await httpAddDeposit({deposit});
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);

export const resetDeposit = createAsyncThunk(
  'deposit/reset',
  async (_,{rejectWithValue}) => {
    try {
      return await httpResetDeposit();
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  },
);


export const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeposit.fulfilled, (state: DepositState, action) => {
        state.loading = false;
        console.log(action.payload)
        state.deposit = action.payload.deposit
      })
      .addCase(getDeposit.pending, (state: DepositState) => {
        state.loading = true;
        state.isError = false;
        state.errorMessages = [];
      })
      .addCase(getDeposit.rejected, (state: DepositState, action: any) => {
        state.loading = false;
        state.isError = true;
        state.errorMessages = Array.isArray(action?.payload?.message) ? action?.payload?.message : [action?.payload?.message];
      })
      .addCase(addDeposit.fulfilled, (state: DepositState, action) => {
        state.loading = false;
        state.deposit = action.payload.deposit
      })
      .addCase(addDeposit.pending, (state: DepositState) => {
        state.loading = true;
        state.isError = false;
        state.errorMessages = [];
      })
      .addCase(addDeposit.rejected, (state: DepositState, action: any) => {
        state.loading = false;
        state.isError = true;
        state.errorMessages = Array.isArray(action?.payload?.message) ? action?.payload?.message : [action?.payload?.message];
      })
      .addCase(resetDeposit.fulfilled, (state: DepositState, action) => {
        state.loading = false;
        state.deposit = action.payload.deposit
      })
      .addCase(resetDeposit.pending, (state: DepositState) => {
        state.loading = true;
        state.isError = false;
        state.errorMessages = [];
      })
      .addCase(resetDeposit.rejected, (state: DepositState, action: any) => {
        state.loading = false;
        state.isError = true;
        state.errorMessages = Array.isArray(action?.payload?.message) ? action?.payload?.message : [action?.payload?.message];
      })
  },
})

export const {
} = depositSlice.actions

export const selectDeposit = (state: RootState) => state.deposit.deposit;
export const selectDepositErrors = (state: RootState) => ({
  isError: state.deposit.isError,
  errorMessages: state.deposit.errorMessages
});


export default depositSlice.reducer;
