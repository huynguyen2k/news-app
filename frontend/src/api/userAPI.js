import axiosClient from './axiosClient'

const userAPI = {
	signIn: data => {
		return axiosClient.post('/users/signIn', data)
	},
	signUp: data => {
		return axiosClient.post('/users/signUp', data)
	},
	updateUser: data => {
		return axiosClient.put('/users/updateUser', data)
	},
	deleteUser: userId => {
		return axiosClient.delete('/users/deleteUser', {
			params: {
				userId,
			},
		})
	},
	getUserList: () => {
		return axiosClient.get('/users/getUserList')
	},
	getRoleList: () => {
		return axiosClient.get('/users/getUserRoleList')
	},
}

export default userAPI
