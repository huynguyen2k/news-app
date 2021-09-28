import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

function NavMenu() {
	return (
		<ul className="nav-menu">
			<li className="nav-menu__item">
				<Link className="nav-menu__link" to="/">
					Kinh doanh
				</Link>
			</li>
			<li className="nav-menu__item">
				<Link className="nav-menu__link" to="/">
					Khoa học
				</Link>
			</li>
			<li className="nav-menu__item">
				<Link className="nav-menu__link" to="/">
					Giải trí
				</Link>
			</li>
			<li className="nav-menu__item">
				<Link className="nav-menu__link" to="/">
					Thể thao
				</Link>
			</li>
			<li className="nav-menu__item">
				<Link className="nav-menu__link" to="/">
					Pháp luật
				</Link>
			</li>
			<li className="nav-menu__item">
				<Link className="nav-menu__link" to="/">
					Sức khỏe
				</Link>
			</li>
		</ul>
	)
}

export default NavMenu
