import React from 'react'
import { ErrorMessage } from 'formik'
import PropTypes from 'prop-types'
// COMPONENTS
import CustomInputFile from 'components/CustomInputFile'

FileField.propTypes = {
	label: PropTypes.string,
	src: PropTypes.string,
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,
}

FileField.defaultProps = {
	label: '',
	src: '',
}

function FileField(props) {
	const { label, src, field, form } = props

	function handleChange(file) {
		form.setFieldValue(field.name, file)
	}

	return (
		<div className="form-group">
			{label && (
				<label className="label" htmlFor={field.name}>
					{label}
				</label>
			)}
			<CustomInputFile src={src} onChange={handleChange} />
			<ErrorMessage name={field.name}>
				{msg => <p className="error-message">{msg}</p>}
			</ErrorMessage>
		</div>
	)
}

export default FileField
