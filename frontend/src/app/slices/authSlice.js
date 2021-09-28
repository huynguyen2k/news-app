import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from 'api/userAPI'
// Utils
import { getUser } from 'utils/getUser'
import { isAuth } from 'utils/isAuth'
import { sleep } from 'utils/sleep'

export const signInUser = createAsyncThunk(
	'auth/signInUser',
	async (data, thunkAPI) => {
		const { isRemember, ...userInfo } = data

		await sleep(1000)
		try {
			const response = await userAPI.signIn(userInfo)
			const user = response.content

			if (isRemember) {
				localStorage.setItem('user', JSON.stringify(user))
			} else {
				sessionStorage.setItem('user', JSON.stringify(user))
			}
			return user
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const signOutUser = createAsyncThunk(
	'auth/signOutUser',
	async (data, thunkAPI) => {
		await sleep(1000)

		localStorage.clear()
		sessionStorage.clear()
		return null
	}
)

const initialState = {
	loading: false,
	isAuth: isAuth(),
	user: getUser(),
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {
		// Sign in user
		[signInUser.pending]: state => {
			state.loading = true
		},
		[signInUser.fulfilled]: (state, action) => {
			state.loading = false
			state.isAuth = true
			state.user = action.payload
			state.error = null
		},
		[signInUser.rejected]: (state, action) => {
			state.loading = false
			state.isAuth = false
			state.user = null
			state.error = action.payload
		},

		// Sign out user
		[signOutUser.pending]: (state, action) => {
			state.loading = true
		},
		[signOutUser.fulfilled]: (state, action) => {
			state.loading = false
			state.isAuth = false
			state.user = action.payload
			state.error = null
		},
		[signOutUser.rejected]: (state, action) => {
			state.loading = false
			state.error = action.error
		},
	},
})

const { reducer } = authSlice
export default reducer
