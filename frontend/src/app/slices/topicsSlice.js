import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import topicAPI from 'api/topicAPI'

export const getTopicListByUserId = createAsyncThunk(
	'topics/getTopicListByUserId',
	async (data, thunkAPI) => {
		try {
			const { user_id } = thunkAPI.getState().auth.user
			const response = await topicAPI.getTopicListByUserId(user_id)
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getAcceptedTopicList = createAsyncThunk(
	'topics/getAcceptedTopicList',
	async (data, thunkAPI) => {
		try {
			const response = await topicAPI.getAcceptedTopicList()
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getUnapprovedTopicList = createAsyncThunk(
	'topics/getUnapprovedTopicList',
	async (data, thunkAPI) => {
		try {
			const response = await topicAPI.getUnapprovedTopicList()
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const approveTopic = createAsyncThunk(
	'topics/approveTopic',
	async (data, thunkAPI) => {
		try {
			const response = await topicAPI.approveTopic(data)
			await thunkAPI.dispatch(getUnapprovedTopicList())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const insertTopic = createAsyncThunk(
	'topics/insertTopic',
	async (data, thunkAPI) => {
		try {
			const response = await topicAPI.insertTopic(data)
			await thunkAPI.dispatch(getTopicListByUserId())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const updateTopic = createAsyncThunk(
	'topics/updateTopic',
	async (data, thunkAPI) => {
		try {
			const response = await topicAPI.updateTopic(data)
			await thunkAPI.dispatch(getTopicListByUserId())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const deleteTopic = createAsyncThunk(
	'topics/deleteTopic',
	async (topicId, thunkAPI) => {
		try {
			const response = await topicAPI.deleteTopic(topicId)
			await thunkAPI.dispatch(getTopicListByUserId())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const initialState = {
	topicList: {
		loading: false,
		error: null,
		data: [],
	},
	acceptedTopicList: {
		loading: false,
		error: null,
		data: [],
	},
	unapprovedTopicList: {
		loading: false,
		error: null,
		data: [],
	},
	topicEdit: null,
}

const topicsSlice = createSlice({
	name: 'topics',
	initialState,
	reducers: {
		setTopicEdit: (state, action) => {
			state.topicEdit = action.payload
		},
	},
	extraReducers: {
		// Topic list
		[getTopicListByUserId.pending]: (state, action) => {
			state.topicList.loading = true
		},
		[getTopicListByUserId.fulfilled]: (state, action) => {
			state.topicList.loading = false
			state.topicList.error = null
			state.topicList.data = action.payload
		},
		[getTopicListByUserId.rejected]: (state, action) => {
			state.topicList.loading = false
			state.topicList.error = action.payload
			state.topicList.data = []
		},

		// Accepted topic list
		[getAcceptedTopicList.pending]: (state, action) => {
			state.acceptedTopicList.loading = true
		},
		[getAcceptedTopicList.fulfilled]: (state, action) => {
			state.acceptedTopicList.loading = false
			state.acceptedTopicList.data = action.payload
			state.acceptedTopicList.error = null
		},
		[getAcceptedTopicList.rejected]: (state, action) => {
			state.acceptedTopicList.loading = false
			state.acceptedTopicList.data = []
			state.acceptedTopicList.error = action.payload
		},

		// Unapproved topic list
		[getUnapprovedTopicList.pending]: (state, action) => {
			state.unapprovedTopicList.loading = true
		},
		[getUnapprovedTopicList.fulfilled]: (state, action) => {
			state.unapprovedTopicList.loading = false
			state.unapprovedTopicList.error = null
			state.unapprovedTopicList.data = action.payload
		},
		[getUnapprovedTopicList.rejected]: (state, action) => {
			state.unapprovedTopicList.loading = false
			state.unapprovedTopicList.error = action.payload
			state.unapprovedTopicList.data = []
		},
	},
})

const { reducer, actions } = topicsSlice
export const { setTopicEdit } = actions
export default reducer
