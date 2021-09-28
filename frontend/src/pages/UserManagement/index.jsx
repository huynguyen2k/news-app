import React, { useState, useEffect, useMemo } from 'react'
import './style.scss'
// HOOKS
import { useDispatch, useSelector } from 'react-redux'
// ACTIONS
import { getRoleList, getUserList } from 'app/slices/usersSlice'
// COMPONENTS
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import UserTable from 'components/Tables/UserTable'
import AddUserForm from 'components/Forms/AddUserForm'
import EditUserForm from 'components/Forms/EditUserForm'
// ICONS
import AddUserIcon from '@material-ui/icons/PersonAdd'
// API
import userAPI from 'api/userAPI'
// UTILS
import customAlerts from 'utils/customAlerts'
import { sleep } from 'utils/sleep'

function UserManagementPage() {
	const dispatch = useDispatch()
	const roleList = useSelector(state => state.users.roleList.data)
	const userList = useSelector(state => state.users.userList.data)
	// STATES
	const [loading, setLoading] = useState(false)
	const [addUserModal, setAddUserModal] = useState(false)
	const [editUser, setEditUser] = useState({
		data: null,
		openModal: false,
	})

	useEffect(() => {
		dispatch(getRoleList())
		dispatch(getUserList())
	}, [dispatch])

	const userRoleOptions = useMemo(() => {
		return roleList.map(role => ({
			value: role.role_id,
			label: role.role_name,
		}))
	}, [roleList])

	async function handleAddUserSubmit(values) {
		const formData = new FormData()
		formData.append('avatar', values.avatar)
		formData.append('full_name', values.full_name)
		formData.append('username', values.username)
		formData.append('password', values.password)
		formData.append('role_id', values.role_id)

		setLoading(true)
		await sleep(1000)
		try {
			const response = await userAPI.signUp(formData)
			await dispatch(getUserList())

			setAddUserModal(false)
			customAlerts.success('Thành công', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo', err.message)
		}
		setLoading(false)
	}

	async function handleEditUserSubmit(values) {
		const formData = new FormData()
		if (values.avatar) {
			formData.append('avatar', values.avatar)
		}
		formData.append('user_id', values.user_id)
		formData.append('full_name', values.full_name)
		formData.append('role_id', values.role_id)

		setLoading(true)
		await sleep(1000)
		try {
			const response = await userAPI.updateUser(formData)
			await dispatch(getUserList())

			setEditUser({
				data: null,
				openModal: false,
			})
			customAlerts.success('Thành công', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo', err.message)
		}
		setLoading(false)
	}

	function handleUserEdit(user) {
		setEditUser({
			openModal: true,
			data: user,
		})
	}

	async function handleUserDelete(userId) {
		const result = await customAlerts.confirm(
			'Cảnh báo!',
			'Bạn có chắc là muốn xóa thành viên này không?'
		)
		if (!result.isConfirmed) return

		setLoading(true)
		await sleep(1000)

		try {
			const response = await userAPI.deleteUser(userId)
			await dispatch(getUserList())

			customAlerts.success('Thành công', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo', err.message)
		}

		setLoading(false)
	}

	return (
		<div className="user-management">
			<Loading loading={loading} />
			<h1 className="user-management__header">Quản lý người dùng</h1>
			<div className="user-management__feature">
				<div className="add-user-btn" onClick={() => setAddUserModal(true)}>
					<AddUserIcon />
					<span>Thêm thành viên</span>
				</div>
			</div>
			<UserTable
				userList={userList}
				onUserEdit={handleUserEdit}
				onUserDelete={handleUserDelete}
			/>
			<Modal
				openModal={addUserModal}
				onCloseModal={() => setAddUserModal(false)}
			>
				<AddUserForm
					userRoleOptions={userRoleOptions}
					onAddUserSubmit={handleAddUserSubmit}
				/>
			</Modal>
			<Modal
				openModal={editUser.openModal}
				onCloseModal={() =>
					setEditUser(prevState => {
						return {
							...prevState,
							openModal: false,
						}
					})
				}
			>
				<EditUserForm
					userEdit={editUser.data}
					userRoleOptions={userRoleOptions}
					onEditUserSubmit={handleEditUserSubmit}
				/>
			</Modal>
		</div>
	)
}

export default UserManagementPage
