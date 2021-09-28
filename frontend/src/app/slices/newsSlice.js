import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import newsAPI from 'api/newsAPI'

export const getNewsListByUserId = createAsyncThunk(
	'news/getNewsListByUserId',
	async (data, thunkAPI) => {
		try {
			const userId = thunkAPI.getState().auth.user.user_id
			const response = await newsAPI.getNewsListByUserId(userId)
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getNewsDetailByNewsId = createAsyncThunk(
	'news/getNewsDetailByNewsId',
	async (newsId, thunkAPI) => {
		try {
			const response = await newsAPI.getNewsDetailByNewsId(newsId)
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getUnapprovedNewsList = createAsyncThunk(
	'news/getUnapprovedNewsList',
	async (data, thunkAPI) => {
		try {
			const response = await newsAPI.getUnapprovedNewsList()
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const getAcceptedLatestNews = createAsyncThunk(
	'news/getAcceptedLatestNews',
	async (data, thunkAPI) => {
		try {
			const response = await newsAPI.getAcceptedLatestNews()
			return response.content
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const approveNews = createAsyncThunk(
	'news/approveNews',
	async (data, thunkAPI) => {
		try {
			const response = await newsAPI.approveNews(data)
			await thunkAPI.dispatch(getUnapprovedNewsList())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const insertNews = createAsyncThunk(
	'news/insertNews',
	async (data, thunkAPI) => {
		try {
			const response = await newsAPI.insertNews(data)
			await thunkAPI.dispatch(getNewsListByUserId())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const updateNews = createAsyncThunk(
	'news/updateNews',
	async (data, thunkAPI) => {
		try {
			const response = await newsAPI.updateNews(data)
			await thunkAPI.dispatch(getNewsListByUserId())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const deleteNews = createAsyncThunk(
	'news/deleteNews',
	async (newsId, thunkAPI) => {
		try {
			const response = await newsAPI.deleteNews(newsId)
			await thunkAPI.dispatch(getNewsListByUserId())

			return response
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const initialState = {
	newsList: {
		loading: false,
		error: null,
		data: [],
	},
	latestNews: {
		loading: false,
		error: null,
		data: [],
	},
	unapprovedNewsList: {
		loading: false,
		error: null,
		data: [],
	},
	newsDetail: {
		loading: false,
		error: null,
		data: null,
	},
}

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {},
	extraReducers: {
		// News list
		[getNewsListByUserId.pending]: (state, action) => {
			state.newsList.loading = true
		},
		[getNewsListByUserId.fulfilled]: (state, action) => {
			state.newsList.loading = false
			state.newsList.error = null
			state.newsList.data = action.payload
		},
		[getNewsListByUserId.rejected]: (state, action) => {
			state.newsList.loading = false
			state.newsList.error = action.payload
			state.newsList.data = []
		},

		// Unapproved news list
		[getUnapprovedNewsList.pending]: (state, action) => {
			state.unapprovedNewsList.loading = true
		},
		[getUnapprovedNewsList.fulfilled]: (state, action) => {
			state.unapprovedNewsList.loading = false
			state.unapprovedNewsList.error = null
			state.unapprovedNewsList.data = action.payload
		},
		[getUnapprovedNewsList.rejected]: (state, action) => {
			state.unapprovedNewsList.loading = false
			state.unapprovedNewsList.error = action.payload
			state.unapprovedNewsList.data = []
		},

		// Latest news
		[getAcceptedLatestNews.pending]: (state, action) => {
			state.latestNews.loading = true
		},
		[getAcceptedLatestNews.fulfilled]: (state, action) => {
			state.latestNews.loading = false
			state.latestNews.error = null
			state.latestNews.data = action.payload
		},
		[getAcceptedLatestNews.rejected]: (state, action) => {
			state.latestNews.loading = false
			state.latestNews.error = action.payload
			state.latestNews.data = []
		},

		// News Detail
		[getNewsDetailByNewsId.pending]: (state, action) => {
			state.newsDetail.loading = false
		},
		[getNewsDetailByNewsId.fulfilled]: (state, action) => {
			state.newsDetail.loading = true
			state.newsDetail.data = action.payload
			state.newsDetail.error = null
		},
		[getNewsDetailByNewsId.rejected]: (state, action) => {
			state.newsDetail.loading = true
			state.newsDetail.data = null
			state.newsDetail.error = action.payload
		},
	},
})

const { reducer } = newsSlice
export default reducer
