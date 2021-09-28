import axiosClient from './axiosClient'

const newsAPI = {
	getNewsListByUserId: userId => {
		return axiosClient.get('/news/getNewsListByUserId', {
			params: {
				user_id: userId,
			},
		})
	},
	getNewsListByTopicId: topicId => {
		return axiosClient.get('/news/getNewsListByTopicId', {
			params: {
				topic_id: topicId,
			},
		})
	},
	getNewsDetailByNewsId: newsId => {
		return axiosClient.get('/news/getNewsDetailByNewsId', {
			params: {
				news_id: newsId,
			},
		})
	},
	getUnapprovedNewsList: () => {
		return axiosClient.get('/news/getUnapprovedNewsList')
	},
	getAcceptedLatestNews: () => {
		return axiosClient.get('/news/getAcceptedLatestNews')
	},
	approveNews: data => {
		return axiosClient.put('/news/approveNews', data)
	},
	insertNews: data => {
		return axiosClient.post('/news/insertNews', data)
	},
	updateNews: data => {
		return axiosClient.put('/news/updateNews', data)
	},
	deleteNews: newsId => {
		return axiosClient.delete('/news/deleteNews', {
			params: {
				new_id: newsId,
			},
		})
	},
}

export default newsAPI
