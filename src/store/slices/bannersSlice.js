import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBanners = createAsyncThunk(
	'banners/fetchBanners',
	async (data, {rejectWithValue}) => {
		const payload = {
			"method": "getBanners"
		};
		const {token, url} = data;

		// try {
		// 	const response = await fetch(url, {
		// 		method: "POST",
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(method)
		// 	});
		// 	return await response.json();
		// } catch (error) {
		// 	return rejectWithValue(error.message)
		// }
//**************** MOCK BANNERS REQUEST ****************************
		try {
			//********************* mock request ****************
			// const response = await axios.get(url);
			//**************** eof  mock request ****************

			const response = await axios.post(url,
				JSON.stringify(payload), {
					headers: {
						"content-type": "application/json",
						"x-access-token": token
						// withCredentials: true
					}
				});
			// console.log(await  response.data)
			return await response.data;
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
);

export const addNewBanner = createAsyncThunk(
	'banners/addNewBanner',
	async function (data, {rejectWithValue, dispatch}) {
		const {
			url,
			token,
			// siteImage,
			// tvImage,
			sImage,
			tImage,
			bannerStart,
			bannerEnd
		} = data;

		try {
			const formData = new FormData();
			formData.append("method", "addBanners");
			formData.append("sort", 1);
			formData.append("date_start", bannerStart);
			formData.append("date_end", bannerEnd);
			formData.append("site_image", sImage);
			formData.append("tv_image", tImage);

			const response = await axios.post(url,
				formData,
				{
					headers: {
						"content-type": "multipart/form-data",
						"x-access-token": token
						// withCredentials: true
					}
				});

			const data = await response.data;
			dispatch(addBanner(data));

			return data

		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
);

export const deleteBannerData = createAsyncThunk(
	'banners/deleteBanner',
	async function (data, {rejectWithValue, dispatch}) {
		const {url, token, id} = data;
		const payload = {
			"method": "deleteBanner",
			"id" : id
		};

		try {
			await axios.post(`${url}`,
				payload,
					{
					headers: {
						"content-type": "application/json",
						"x-access-token": token
						// withCredentials: true
					}
				});
			console.log('before dispatch', id)
			dispatch(removeBanner(id))

		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
);

const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload
};

const bannersSlice = createSlice({
	name: 'banners',
	initialState: {
		bannersData: [],
		status: null,
		error: null
	},
	reducers: {
		addBanner(state, action) {
			state.bannersData.push(action.payload);
		},
		removeBanner(state, action) {
			state.bannersData = state.bannersData.filter(banner => banner._id !== action.payload);
		},
		// editBanner(state, action) {}
	},
	extraReducers: {
		[fetchBanners.pending]: (state) => {
			state.status = 'loading';
			state.error = null
		},
		[fetchBanners.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.bannersData = action.payload;
		},
		[fetchBanners.rejected]: setError,
		[addNewBanner.rejected]: setError,
		[deleteBannerData.rejected]: setError,

	}
});
const {addBanner, removeBanner, /*editBanner*/} = bannersSlice.actions;

export default bannersSlice.reducer;