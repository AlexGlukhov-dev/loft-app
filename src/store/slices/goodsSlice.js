import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {injectKeyValueInArray} from "../../utils";
import {GOODS_API, GOODS_API_WEB_HOOK} from "../../API";

export const fetchGoods = createAsyncThunk(
	'goods/fetchGoods',
	async (data, {rejectWithValue}) => {
		try {
			const response = await axios.get(GOODS_API_WEB_HOOK)
			const data = await response.data;
			const total = data.total;
			let allProducts = data.result;
			for (let i = 50; i < total; i += 50) {
				const response = await axios.get(GOODS_API_WEB_HOOK+`?start=${i}`)
				const data = await response.data.result;
				allProducts = [...allProducts, ...data]
			}
			return injectKeyValueInArray(allProducts, {
				"AMOUNT": 1,
				"REMAINS": 100
			});
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
);

export const sendGoods = createAsyncThunk(
	'goods/sendGoods',
	async function (goodsData, {rejectWithValue}) {
		const {token, ...rest} = goodsData;
		try {
			const payload = {
				"method": "sendGoods",
				rest
			};

			const response = await axios.post(GOODS_API,
				payload,
				{
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

const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload
};

const goodsSlice = createSlice({
	name: 'goods',
	initialState: {
		goodsData: [],
		purchasedGoods: [],
		totalPrice: 0,
		status: null,
		error: null
	},
	reducers: {
		addGood(state, action) {
			const existingGoodIndex = state.purchasedGoods.findIndex(good => good.ID === action.payload.ID);
			const existingGood = state.purchasedGoods[existingGoodIndex];
			let updatedGood;
			let updatedGoods;

			if (existingGood) {
				updatedGood = {
					...existingGood,
					AMOUNT: +action.payload.AMOUNT
				};
				updatedGoods = [...state.purchasedGoods];
				updatedGoods[existingGoodIndex] = updatedGood;
				state.purchasedGoods = updatedGoods;
			} else {
				updatedGood = {...action.payload};
				state.purchasedGoods = state.purchasedGoods.concat(updatedGood)
			}
			state.totalPrice = +state.purchasedGoods.reduce((acc, good) =>{
							return acc + +good.PRICE * +good.AMOUNT
						}, 0);

		},
		removeGood(state, action) {
			const existingGoodIndex = state.purchasedGoods.findIndex(good => good.ID === action.payload);
			const existingGood = state.purchasedGoods[existingGoodIndex];

			state.totalPrice = +state.totalPrice - +existingGood.PRICE;
			let updatedGoods;
			if (+existingGood.AMOUNT === 1) {
				updatedGoods = state.purchasedGoods.filter(good => good.ID !== action.payload);

			} else {
				const updatedGood = {...existingGood, AMOUNT: +existingGood.REMAINS - 1};
				updatedGoods = [...state.purchasedGoods];
				updatedGoods[existingGoodIndex] = updatedGood;
				state.purchasedGoods = updatedGoods;
			}
		},
		deleteGood(state, action) {
			state.purchasedGoods = state.purchasedGoods.filter(good => good.ID !== action.payload.ID);
			state.totalPrice = state.purchasedGoods.reduce((acc, good) =>{
				return acc + +good.PRICE * +good.AMOUNT
			}, 0);
		},
		clearCart(state) {
			state.purchasedGoods = [];
			state.totalPrice = 0
		}
	},
	extraReducers: {
		[fetchGoods.pending]: (state) => {
			state.status = 'loading';
			state.error = null
		},
		[fetchGoods.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.goodsData = action.payload;
		},
		[fetchGoods.rejected]: setError,
		// [addNewGood.rejected]: setError,
		// [deleteGoodData.rejected]: setError,

	}
});

export const {addGood, removeGood, deleteGood, clearCart} = goodsSlice.actions;

export default goodsSlice.reducer;