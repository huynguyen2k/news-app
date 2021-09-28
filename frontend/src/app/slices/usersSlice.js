import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userAPI from 'api/userAPI'

export const getUserList = createAsyncThunk(
	'users/getUserList',
	async (data, thunkAPI) => {
		try {
			const response = await userAPI.getUserList()
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getRoleList = createAsyncThunk(
	'users/getRoleList',
	async (data, thunkAPI) => {
		try {
			const response = await userAPI.getRoleList()
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const initialState = {
	userList: {
		loading: false,
		error: null,
		data: [],
	},
	roleList: {
		loading: false,
		error: null,
		data: [],
	},
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		// User list
		[getUserList.pending]: (state, action) => {
			state.userList.loading = true
		},
		[getUserList.fulfilled]: (state, action) => {
			state.userList.loading = false
			state.userList.data = action.payload
			state.userList.error = null
		},
		[getUserList.rejected]: (state, action) => {
			state.userList.loading = false
			state.userList.data = []
			state.userList.error = action.payload
		},
		// Role list
		[getRoleList.pending]: (state, action) => {
			state.roleList.loading = true
		},
		[getRoleList.fulfilled]: (state, action) => {
			state.roleList.loading = false
			state.roleList.data = action.payload
			state.roleList.error = null
		},
		[getRoleList.rejected]: (state, action) => {
			state.roleList.loading = false
			state.roleList.data = []
			state.roleList.error = action.payload
		},
	},
})

const { reducer } = usersSlice
export default reducer
