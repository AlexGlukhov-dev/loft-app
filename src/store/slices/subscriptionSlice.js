import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {SUBSCRIPTIONS_API} from "../../API";

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios(SUBSCRIPTIONS_API);
      return await response.data;
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
);


const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptionsData: null,
    subscribe: [{
      cashier: "",
      contact: "",
      date: "",
      dealTitle: "",
      id: "",
      transactionAmount: ""
    }],
    status: null,
    error: null
  },
  reducers: {
    getSubscribe: (state, action) => {
      state.subscribe = state.subscriptionsData.filter(sub => sub.id === action.payload)
    },
    clearSubscribe: (state) => {
      state.subscribe = [{
        cashier: "",
        contact: "",
        date: "",
        dealTitle: "",
        id: "",
        transactionAmount: ""
      }]
    },
    deleteSubscribe: (state, action) => {
      state.subscriptionsData = state.subscriptionsData.filter(sub => sub.id !== action.payload)
    }
  },
  extraReducers: {
    [fetchSubscriptions.pending]: (state) => {
      state.status = 'loading';
      state.error = null
    },
    [fetchSubscriptions.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.subscriptionsData = action.payload;
    },
    [fetchSubscriptions.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
});
export const {getSubscribe, clearSubscribe, deleteSubscribe} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;