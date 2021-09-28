import React, { useEffect } from 'react'
import LoginForm from '../../components/Forms/LoginForm'
import './style.scss'
// HOOKS
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
// ACTIONS
import { signInUser } from 'app/slices/authSlice'
// UTILS
import customAlerts from 'utils/customAlerts'

function LoginPage() {
	const history = useHistory()
	const dispatch = useDispatch()

	const user = useSelector(state => state.auth.user)
	const isAuth = useSelector(state => state.auth.isAuth)
	const submitLoading = useSelector(state => state.auth.loading)

	async function handleSubmit(values) {
		try {
			await dispatch(signInUser(values)).unwrap()
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
	}

	useEffect(() => {
		if (isAuth) {
			switch (user.role_id) {
				case 1:
					history.replace('/system-admin')
					break
				case 2:
					history.replace('/admin')
					break
				default:
					history.replace('/author')
			}
		}
	})

	return (
		<div className="login">
			<LoginForm onSubmit={handleSubmit} submitLoading={submitLoading} />
		</div>
	)
}

export default LoginPage
