import React from 'react'
import './style.scss'
// COMPONENTS
import NavMenu from 'components/NavMenu'
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import PersonIcon from '@material-ui/icons/Person'

function index() {
	return (
		<div className="top-nav">
			<Container fixed>
				<div className="top-nav__wrap">
					<Link className="top-nav__logo-link" to="/">
						VNNews
					</Link>
					<NavMenu />
					<Link className="top-nav__login" to="/login">
						<PersonIcon />
						<span>Đăng nhập</span>
					</Link>
				</div>
			</Container>
		</div>
	)
}

export default index
