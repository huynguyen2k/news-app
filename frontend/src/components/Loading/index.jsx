import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import Spinner from 'components/Spinner'

Loading.propTypes = {
	loading: PropTypes.bool,
}

Loading.defaultProps = {
	loading: false,
}

function Loading({ loading }) {
	if (!loading) return null

	return (
		<div className="loading">
			<Spinner size={50} thickness={4} color="black" />
		</div>
	)
}

export default Loading
