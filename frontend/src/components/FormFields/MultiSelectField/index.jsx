import React from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import Select from 'react-select'
import { ErrorMessage } from 'formik'

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

MultiSelectField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.array,
}

MultiSelectField.defaultProps = {
	label: '',
	placeholder: '',
	options: [],
}

function MultiSelectField(props) {
	const { field, form, label, placeholder, options } = props
	const selectedValues = options.filter(option =>
		field.value.includes(option.value)
	)

	function handleSelectChange(options) {
		const value = options.map(option => option.value)
		form.setFieldValue(field.name, value, true)
	}

	function handleSelectBlur() {
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
				id={field.name}
				placeholder={placeholder}
				onChange={handleSelectChange}
				onBlur={handleSelectBlur}
				value={selectedValues}
				// react-select props
				isMulti
				options={options}
				closeMenuOnSelect={false}
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

export default MultiSelectField
