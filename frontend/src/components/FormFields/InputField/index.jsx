import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from 'formik'

InputField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,
}

InputField.defaultProps = {
	label: '',
	type: 'text',
	placeholder: '',
}

function InputField(props) {
	const { label, type, placeholder, field } = props

	return (
		<div className="form-group">
			{label && (
				<label className="label" htmlFor={field.name}>
					{label}
				</label>
			)}
			<input
				{...field}
				className="input"
				type={type}
				id={field.name}
				placeholder={placeholder}
			/>
			<ErrorMessage name={field.name}>
				{msg => <p className="error-message">{msg}</p>}
			</ErrorMessage>
		</div>
	)
}

export default InputField
