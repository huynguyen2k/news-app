export const isAuth = () => {
	return !!(localStorage.getItem('user') || sessionStorage.getItem('user'))
}
