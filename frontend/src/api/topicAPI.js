import axiosClient from './axiosClient'

const topicAPI = {
	getTopicListByUserId: userId => {
		return axiosClient.get('/topics/getTopicListByUserId', {
			params: {
				user_id: userId,
			},
		})
	},
	getUnapprovedTopicList: () => {
		return axiosClient.get('/topics/getUnapprovedTopicList')
	},
	getAcceptedTopicList: () => {
		return axiosClient.get('/topics/getAcceptedTopicList')
	},
	approveTopic: data => {
		return axiosClient.put('/topics/approveTopic', data)
	},
	insertTopic: data => {
		return axiosClient.post('/topics/insertTopic', data)
	},
	updateTopic: data => {
		return axiosClient.put('/topics/updateTopic', data)
	},
	deleteTopic: topicId => {
		return axiosClient.delete('/topics/deleteTopic', {
			params: {
				topic_id: topicId,
			},
		})
	},
}

export default topicAPI
