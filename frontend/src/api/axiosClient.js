import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: params => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async config => {
	const user = localStorage.getItem('user')

	if (user && user.accessToken) {
		config.headers.Authorization = 'Bearer ' + user.accessToken
	}
	return config
})

axiosClient.interceptors.response.use(
	response => {
		if (response && response.data) {
			return response.data
		}
		return response
	},
	error => {
		if (error.response.data) {
			throw error.response.data
		}
		throw error
	}
)

export default axiosClient
