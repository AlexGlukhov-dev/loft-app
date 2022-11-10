import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClubs = createAsyncThunk(
	'clubs/fetchClubs',
	async (url, {rejectWithValue}) => {
		const method = {
			"method": "getClubs"
		};

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

    try {
        const response = await axios.post(url,
            JSON.stringify(method), {
                headers: {
                    "content-type": "application/json",
                    // withCredentials: true
                }
            });

        return await response.data;
    } catch (err) {
			return rejectWithValue(err.message)
    }
	}
);

const clubsSlice = createSlice({
	name: 'clubs',
	initialState: {
		clubs: [],
		status: null,
		error: null
	},
	reducers: {},
	extraReducers: {
		[fetchClubs.pending]: (state) => {
			state.status = 'loading';
			state.error = null
		},
		[fetchClubs.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.clubs = action.payload;
		},
		[fetchClubs.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload
		}
	}
});

export default clubsSlice.reducer;