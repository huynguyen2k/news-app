import React from 'react'
import PropTypes from 'prop-types'

CheckboxField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,
	label: PropTypes.string,
}

CheckboxField.defaultProps = {
	label: '',
}

function CheckboxField(props) {
	const { label, field } = props

	return (
		<div className="form-group">
			<label className="checkbox">
				<input type="checkbox" className="checkbox-input" {...field} />
				<span className="checkbox-label">{label}</span>
			</label>
		</div>
	)
}

export default CheckboxField
