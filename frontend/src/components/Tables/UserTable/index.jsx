import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BoxIcon from 'assets/images/box-icon.png'
// ICONS
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'

UserTable.propTypes = {
	loading: PropTypes.bool,
	userList: PropTypes.array,
	onUserEdit: PropTypes.func,
	onUserDelete: PropTypes.func,
}

UserTable.defaultProps = {
	loading: false,
	userList: [],
	onUserEdit: () => {},
	onUserDelete: () => {},
}

function UserTable({ userList, onUserDelete, onUserEdit }) {
	function renderUserList() {
		if (userList.length === 0) {
			return (
				<tr>
					<td colSpan={6}>
						<div className="empty-data">
							<img src={BoxIcon} alt="box icon" />
							<span>Không có dữ liệu</span>
						</div>
					</td>
				</tr>
			)
		}
		return userList.map((user, index) => {
			return (
				<tr key={user.user_id}>
					<td>{index + 1}</td>
					<td>
						<img className="avatar" src={user.avatar} alt="Avatar" />
					</td>
					<td>{user.full_name}</td>
					<td>{user.username}</td>
					<td>{user.role_name}</td>
					<td>
						<div className="user-table__controls">
							<button
								className="btn btn--info"
								onClick={() => onUserEdit(user)}
							>
								<EditIcon />
							</button>
							<button
								className="btn btn--danger"
								onClick={() => onUserDelete(user.user_id)}
							>
								<DeleteIcon />
							</button>
						</div>
					</td>
				</tr>
			)
		})
	}

	return (
		<table className="user-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Ảnh đại diện</th>
					<th>Họ và tên</th>
					<th>Tài khoản</th>
					<th>Chức vụ</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>{renderUserList()}</tbody>
		</table>
	)
}

export default UserTable
