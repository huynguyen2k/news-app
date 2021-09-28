import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import subtopicAPI from 'api/subtopicAPI'

export const approveSubtopic = createAsyncThunk(
	'subtopics/approveSubtopic',
	async (data, thunkAPI) => {
		try {
			const response = await subtopicAPI.approveSubtopic(data)
			await thunkAPI.dispatch(getUnapprovedSubtopicList())
			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const insertSubtopic = createAsyncThunk(
	'subtopics/insertSubtopic',
	async (data, thunkAPI) => {
		try {
			const response = await subtopicAPI.insertSubtopic(data)
			await thunkAPI.dispatch(getSubtopicListByUserId())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const updateSubtopic = createAsyncThunk(
	'subtopics/updateSubtopic',
	async (data, thunkAPI) => {
		try {
			const response = await subtopicAPI.updateSubtopic(data)
			await thunkAPI.dispatch(getSubtopicListByUserId())
			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const deleteSubtopic = createAsyncThunk(
	'subtopics/deleteSubtopic',
	async (subtopicId, thunkAPI) => {
		try {
			const response = await subtopicAPI.deleteSubtopic(subtopicId)
			await thunkAPI.dispatch(getSubtopicListByUserId())
			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getSubtopicListByUserId = createAsyncThunk(
	'subtopics/getSubtopicListByUserId',
	async (data, thunkAPI) => {
		const { user_id } = thunkAPI.getState().auth.user
		try {
			const response = await subtopicAPI.getSubtopicListByUserId(user_id)
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getAcceptedSubtopicList = createAsyncThunk(
	'subtopics/getAcceptedSubtopicList',
	async (data, thunkAPI) => {
		try {
			const response = await subtopicAPI.getAcceptedSubtopicList()
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getUnapprovedSubtopicList = createAsyncThunk(
	'subtopics/getUnapprovedSubtopicList',
	async (data, thunkAPI) => {
		try {
			const response = await subtopicAPI.getUnapprovedSubtopicList()
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const subtopicsSlice = createSlice({
	name: 'subtopics',
	initialState: {
		subtopicList: {
			loading: false,
			error: null,
			data: [],
		},
		acceptedSubtopicList: {
			loading: false,
			error: null,
			data: [],
		},
		unapprovedSubtopicList: {
			loading: false,
			error: null,
			data: [],
		},
	},
	reducers: {},
	extraReducers: {
		// Subtopic list
		[getSubtopicListByUserId.pending]: (state, action) => {
			state.subtopicList.loading = true
		},
		[getSubtopicListByUserId.fulfilled]: (state, action) => {
			state.subtopicList.loading = false
			state.subtopicList.error = null
			state.subtopicList.data = action.payload
		},
		[getSubtopicListByUserId.rejected]: (state, action) => {
			state.subtopicList.loading = false
			state.subtopicList.error = action.payload
			state.subtopicList.data = []
		},

		// Accepted subtopic list
		[getAcceptedSubtopicList.pending]: (state, action) => {
			state.acceptedSubtopicList.loading = false
		},
		[getAcceptedSubtopicList.fulfilled]: (state, action) => {
			state.acceptedSubtopicList.loading = true
			state.acceptedSubtopicList.error = null
			state.acceptedSubtopicList.data = action.payload
		},
		[getAcceptedSubtopicList.rejected]: (state, action) => {
			state.acceptedSubtopicList.loading = true
			state.acceptedSubtopicList.error = action.payload
			state.acceptedSubtopicList.data = []
		},

		// Unapproved Subtopic list
		[getUnapprovedSubtopicList.pending]: (state, action) => {
			state.unapprovedSubtopicList.loading = true
		},
		[getUnapprovedSubtopicList.fulfilled]: (state, action) => {
			state.unapprovedSubtopicList.loading = false
			state.unapprovedSubtopicList.error = null
			state.unapprovedSubtopicList.data = action.payload
		},
		[getUnapprovedSubtopicList.rejected]: (state, action) => {
			state.unapprovedSubtopicList.loading = false
			state.unapprovedSubtopicList.error = action.payload
			state.unapprovedSubtopicList.data = []
		},
	},
})

const { reducer } = subtopicsSlice
export default reducer
