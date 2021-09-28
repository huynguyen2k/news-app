import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// ICONS
import ProfileIcon from '@material-ui/icons/AccountBox'
import SettingIcon from '@material-ui/icons/Settings'
import HelpIcon from '@material-ui/icons/Help'
import SignOutIcon from '@material-ui/icons/ExitToApp'

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	onSignOut: PropTypes.func,
}

Profile.defaultProps = {
	onSignOut: () => {},
}

function Profile({ profile, onSignOut }) {
	const dropdownRef = useRef(null)

	useEffect(() => {
		document.onclick = e => {
			const targetElement = e.target.closest('.profile')

			if (targetElement) {
				dropdownRef.current.classList.toggle('active')
			} else {
				dropdownRef.current.classList.remove('active')
			}
		}

		return () => {
			document.onclick = null
		}
	}, [])

	return (
		<div className="profile">
			<div className="profile__avatar">
				<img src={profile.avatar} alt={profile.name} />
			</div>
			<div className="profile__info">
				<p className="name">{profile.name}</p>
				<p className="role">{profile.role}</p>
			</div>
			<div className="profile__dropdown" ref={dropdownRef}>
				<div className="profile__dropdown-item">
					<i className="icon">
						<ProfileIcon />
					</i>
					<span className="text">Hồ sơ</span>
				</div>
				<div className="profile__dropdown-item">
					<i className="icon">
						<SettingIcon />
					</i>
					<span className="text">Cài đặt</span>
				</div>
				<div className="profile__dropdown-item">
					<i className="icon">
						<HelpIcon />
					</i>
					<span className="text">Trợ giúp</span>
				</div>
				<div className="profile__dropdown-item" onClick={onSignOut}>
					<i className="icon">
						<SignOutIcon />
					</i>
					<span className="text">Đăng xuất</span>
				</div>
			</div>
		</div>
	)
}

export default Profile
