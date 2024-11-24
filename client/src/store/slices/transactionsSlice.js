import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';

const TRANSACTIONS_SLICE_NAME = 'transactions';

const initialState = {
  transactions: [],
  isFetching: true,
  error: null,
};

export const getTransactionsThunk = decorateAsyncThunk({
  key: `${TRANSACTIONS_SLICE_NAME}/get`,
  thunk: async () => {
    const { data } = await restController.getTransactions();
    return data;
  },
});

const reducers = {};

const extraReducers = builder => {
  builder.addCase(getTransactionsThunk.pending, pendingReducer);
  builder.addCase(getTransactionsThunk.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.transactions = [...payload];
  });
  builder.addCase(getTransactionsThunk.rejected, rejectedReducer);
};

const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { reducer, actions } = transactionsSlice;

export default reducer;
