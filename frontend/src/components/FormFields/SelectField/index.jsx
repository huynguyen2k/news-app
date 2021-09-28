import React from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import Select from 'react-select'
import { ErrorMessage } from 'formik'

SelectField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.array,
}

SelectField.defaultProps = {
	label: '',
	placeholder: '',
	options: [],
}

const customStyles = {
	control: styles => ({ ...styles, padding: '4px' }),
	singleValue: () => ({
		height: 'auto',
	}),
	option: styles => ({
		...styles,
		padding: '12px 8px',
		cursor: 'pointer',
		userSelect: 'none',
	}),
}

function SelectField(props) {
	const { label, placeholder, options, field, form } = props
	const selectedValue =
		options.find(option => option.value === field.value) || null

	function handleChange(option) {
		form.setFieldValue(field.name, option.value, true)
	}

	function handleBlur() {
		form.setFieldTouched(field.name, true, true)
	}

	return (
		<div className="form-group">
			{label && (
				<label className="label" htmlFor={field.name}>
					{label}
				</label>
			)}
			<Select
				{...field}
				value={selectedValue}
				onChange={handleChange}
				onBlur={handleBlur}
				id={field.name}
				placeholder={placeholder}
				options={options}
				styles={customStyles}
				theme={theme => ({
					...theme,
					colors: {
						...theme.colors,
						primary: '#01bd6f',
					},
				})}
			/>
			<ErrorMessage name={field.name}>
				{msg => <p className="error-message">{msg}</p>}
			</ErrorMessage>
		</div>
	)
}

export default SelectField
