export const getUser = () => {
	const user = localStorage.getItem('user') || sessionStorage.getItem('user')

	if (user) {
		return JSON.parse(user)
	}
	return null
}
