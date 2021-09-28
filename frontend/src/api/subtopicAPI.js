import axiosClient from './axiosClient'

const subtopicAPI = {
	getSubtopicListByUserId: userId => {
		return axiosClient.get('/subtopics/getSubtopicListByUserId', {
			params: {
				user_id: userId,
			},
		})
	},
	getAcceptedSubtopicList: () => {
		return axiosClient.get('/subtopics/getAcceptedSubtopicList')
	},
	getUnapprovedSubtopicList: () => {
		return axiosClient.get('/subtopics/getUnapprovedSubtopicList')
	},
	approveSubtopic: data => {
		return axiosClient.put('/subtopics/approveSubtopic', data)
	},
	insertSubtopic: data => {
		return axiosClient.post('/subtopics/insertSubtopic', data)
	},
	updateSubtopic: data => {
		return axiosClient.put('/subtopics/updateSubtopic', data)
	},
	deleteSubtopic: subtopicId => {
		return axiosClient.delete('/subtopics/deleteSubtopic', {
			params: {
				subtopic_id: subtopicId,
			},
		})
	},
}

export default subtopicAPI
