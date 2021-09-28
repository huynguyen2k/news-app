import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import Profile from 'components/Profile'
import { NavLink } from 'react-router-dom'
// ICONS
import ArrowRight from '@material-ui/icons/ChevronRight'

SideMenu.propTypes = {
	menu: PropTypes.array.isRequired,
	profile: PropTypes.object.isRequired,
	onSignOut: PropTypes.func,
}

SideMenu.defaultProps = {
	onSignOut: () => {},
}

function SideMenu({ menu, profile, onSignOut }) {
	const sideMenuRef = useRef(null)

	useEffect(() => {
		const prevSubMenuLinkActive = sideMenuRef.current.querySelector(
			'.disabled-link.active'
		)
		if (prevSubMenuLinkActive) {
			prevSubMenuLinkActive.classList.remove('active')
		}

		const subMenuLink = sideMenuRef.current.querySelector(
			'.sub-menu-link.active'
		)
		if (subMenuLink) {
			const menuItem = subMenuLink.closest('.side-menu__item')
			menuItem.querySelector('.side-menu__link').classList.add('active')
		}
	})

	function handleLinkClick(e, index) {
		const menuItem = e.target.closest('.side-menu__item')
		const subMenu = menuItem.querySelector('.side-menu__sub-menu')
		const subMenuWrap = menuItem.querySelector('.side-menu__sub-menu-wrap')
		const heightMenuWrap = getComputedStyle(subMenuWrap).height

		const menuItems = sideMenuRef.current.querySelectorAll('.side-menu__item')
		menuItems.forEach((item, itemIndex) => {
			if (index === itemIndex) return

			if (item.classList.contains('active-sub-menu')) {
				item.classList.remove('active-sub-menu')
				item.querySelector('.side-menu__sub-menu').style.height = 0
			}
		})

		menuItem.classList.toggle('active-sub-menu')
		if (menuItem.classList.contains('active-sub-menu')) {
			subMenu.style.height = heightMenuWrap
		} else {
			subMenu.style.height = 0
		}
	}

	function renderSubMenuList(subMenu) {
		return subMenu.map((item, index) => {
			return (
				<NavLink
					exact
					key={index}
					className="sub-menu-link"
					to={item.url}
					activeClassName="active"
				>
					<i className="sub-menu-icon">
						<ArrowRight />
					</i>
					<span className="sub-menu-title">{item.title}</span>
				</NavLink>
			)
		})
	}

	return (
		<div className="side-menu" ref={sideMenuRef}>
			<Profile profile={profile} onSignOut={onSignOut} />
			{menu.map((item, index) => {
				return (
					<div className="side-menu__item" key={index}>
						{item.subMenu ? (
							<>
								<span
									className="side-menu__link disabled-link"
									onClick={e => handleLinkClick(e, index)}
								>
									<i className="icon">{item.icon}</i>
									<span className="title">{item.title}</span>
									<i className="arrow-right">
										<ArrowRight />
									</i>
								</span>
								<div className="side-menu__sub-menu">
									<div className="side-menu__sub-menu-wrap">
										{renderSubMenuList(item.subMenu)}
									</div>
								</div>
							</>
						) : (
							<NavLink
								to={item.url}
								className="side-menu__link"
								activeClassName="active"
							>
								<i className="icon">{item.icon}</i>
								<span className="title">{item.title}</span>
							</NavLink>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default SideMenu
