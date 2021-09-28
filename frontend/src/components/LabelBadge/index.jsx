import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

LabelBadge.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
}

LabelBadge.defaultProps = {
	type: 'success',
	text: '',
}

function LabelBadge({ type, text }) {
	return <span className={`label-badge label-badge--${type}`}>{text}</span>
}

export default LabelBadge
