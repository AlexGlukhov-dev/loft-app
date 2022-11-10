import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {LOFT_USER_API} from '../../API';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (data, {rejectWithValue, dispatch}) => {

		try {
			const response = await fetch(LOFT_USER_API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			});
			if (response.ok) {
				dispatch(login());
				return await response.json();
			}

			if (!response.ok) {
				// const errData = await response.json();
				// throw new Error(errData?.message)
				let errData = '';
				if (response.status === 401) {
					errData = `Ошибка авторизации (${response.status})`;
				} else {
					errData = `Ошибка сервера ${response.status}`;
				}
				throw new Error(errData)
			}
			// dispatch(login());
			// return await response.json();

		} catch (error) {
			return rejectWithValue('Ошибка авторизации!')
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {
			_id: null,
			first_name: '',
			last_name: '',
			photo_bitrix: '',
		},
		authIs: false,
		isAuth: false,
		token: null,
		error: null,
		status: null,
		currentPage: 'Добро пожаловать!'
	},
	reducers: {
		setUser(state, action) {
				state.user.id = action.payload.id;
				state.user.email = action.payload.email;
				state.user.phone = action.payload.phone;
				state.user.token = action.payload.token;
		},
		removeUser(state) {
			state.user.id = null;
			state.user.email = null;
			state.user.phone = null;
			state.user.token = null;
		},
		login(state) {
			state.isAuth = true;
		},
		logout(state) {
			state.isAuth = false;
			document.location.reload();
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		}
	},
	extraReducers: {
		[fetchUser.pending]: (state) => {
			state.status = 'loading';
			state.error = null
		},
		[fetchUser.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.user = action.payload;
		},
		[fetchUser.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload
		}
	}
});

export const {setUser, removeUser, login, logout, setCurrentPage} = userSlice.actions;
export default userSlice.reducer;