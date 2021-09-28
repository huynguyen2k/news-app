import React from 'react'
import PropTypes from 'prop-types'
import { ErrorMessage } from 'formik'

TextAreaField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
}

TextAreaField.defaultProps = {
	label: '',
	placeholder: '',
}

function TextAreaField(props) {
	const { field, label, placeholder } = props

	return (
		<div className="form-group">
			{label && (
				<label className="label" htmlFor={field.name}>
					{label}
				</label>
			)}
			<textarea
				{...field}
				id={field.name}
				className="textarea"
				placeholder={placeholder}
			/>
			<ErrorMessage name={field.name}>
				{msg => <p className="error-message">{msg}</p>}
			</ErrorMessage>
		</div>
	)
}

export default TextAreaField
