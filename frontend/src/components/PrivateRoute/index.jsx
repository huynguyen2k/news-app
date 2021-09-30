import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

PrivateRoute.propTypes = {
	isAuth: PropTypes.bool,
	exact: PropTypes.bool,
	path: PropTypes.string.isRequired,
	component: PropTypes.object.isRequired,
}

PrivateRoute.defaultProps = {
	isAuth: false,
	exact: false,
}

function PrivateRoute(props) {
	const { component: Component, isAuth, ...rest } = props

	return (
		<Route
			{...rest}
			render={props =>
				isAuth ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	)
}

export default PrivateRoute
