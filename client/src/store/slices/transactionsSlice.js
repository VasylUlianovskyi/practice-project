import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { decorateAsyncThunk } from '../../utils/store';

const TRANSACTIONS_SLICE_NAME = 'transactions';

const initialState = {
  transactions: [],
  isFetching: true,
  error: null,
};

// /transactions/get
// export const getTransactionsThunk = createAsyncThunk(
//   `${TRANSACTIONS_SLICE_NAME}/get`,
//   async (payload, { rejectWithValue }) => {
//     try {
//       const { data } = await restController.getTransactions();
//       return data;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

export const getTransactionsThunk = decorateAsyncThunk({
  key: `${TRANSACTIONS_SLICE_NAME}/get`,
  thunk: async payload => {
    const { data } = await restController.getTransactions();
    return data;
  },
});

const reducers = {};

const extraReducers = builder => {
  builder.addCase(getTransactionsThunk.pending, state => {
    state.isFetching = true;
    state.error = null;
  });
  builder.addCase(getTransactionsThunk.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.transactions = [...payload];
  });
  builder.addCase(getTransactionsThunk.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
  });
};

const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { reducer, actions } = transactionsSlice;

export default reducer;
