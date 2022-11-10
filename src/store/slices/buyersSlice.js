import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BITRIX_USERS} from '../../API';
import {PURCHASE_API} from '../../API';

import axios from "axios";

export const fetchBuyers = createAsyncThunk(
	'buyers/fetchBuyers',
	async (data, {rejectWithValue}) => {
		const {token, newInputValue} = data;
		const payload = {
			"method": "getClientByLastName",
			"LAST_NAME": newInputValue
		};
		try {
			const response = await axios.post(BITRIX_USERS,
				payload, {
					headers: {
						"content-type": "application/json",
						"x-access-token": token
					}
				});


			return await response.data;
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
);

export const fetchCards = createAsyncThunk(
	'buyers/fetchCards',
	async (cardNumber, {rejectWithValue}) => {
		try {
			const response = await axios(`http://secret.loftfitness.ru:4000/v1/gym-membership/${cardNumber}`)
			return await response.data;
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
);

export const sendPurchasedData = createAsyncThunk(
	'buyers/sendPurchaseData',
	async (data, {rejectWithValue}) => {
		const {token, ...rest} = data;
		//TODO change method value
		const payload = {
			"method": "sendPurchases",
			...rest
		};
		try {
			const response = await axios.post(PURCHASE_API,
				JSON.stringify(payload), {
					headers: {
						"content-type": "application/json",
						"x-access-token": token
					}
				});
			return await response.data;
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
);

const buyersSlice = createSlice({
	name: 'buyers',
	initialState: {
		cards: [],
		card: null,
		buyers: [],
		buyer: null,
		openShift: false,
		error: null,
		status: null,
	},
	reducers: {
		clearBuyersList(state) {
				state.buyers = [];
		},
		clearCardsList(state) {
			state.cards = [];
		},
		selectedBuyer(state, action) {
			state.buyer = action.payload;
		},
		selectedCard(state, action) {
			state.card = action.payload;
		},
		setOpenShift(state) {
			state.openShift = true;
		},
		setCloseShift(state) {
			state.openShift = false
		}
	},
	extraReducers: {
		[fetchBuyers.pending]: (state) => {
			state.status = 'loading';
			state.error = null
		},
		[fetchBuyers.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.buyers = action.payload;
		},
		[fetchBuyers.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload
		},

		[fetchCards.pending]: (state) => {
			state.status = 'loading';
			state.error = null
		},
		[fetchCards.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.cards = action.payload;
		},
		[fetchCards.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload
		}
	}
});

export const {selectedBuyer, setOpenShift, selectedCard, clearCardsList} = buyersSlice.actions;
export default buyersSlice.reducer;