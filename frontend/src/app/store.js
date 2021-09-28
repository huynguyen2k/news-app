import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import usersSlice from './slices/usersSlice'
import topicsSlice from './slices/topicsSlice'
import subtopicsSlice from './slices/subtopicsSlice'
import newsSlice from './slices/newsSlice'

const store = configureStore({
	reducer: {
		auth: authSlice,
		users: usersSlice,
		topics: topicsSlice,
		subtopics: subtopicsSlice,
		news: newsSlice,
	},
})

export default store
