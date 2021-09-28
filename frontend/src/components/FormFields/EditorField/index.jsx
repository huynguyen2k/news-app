import React from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import { ErrorMessage } from 'formik'
import { Editor } from '@tinymce/tinymce-react'

EditorField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	label: PropTypes.string,
}

EditorField.defaultProps = {
	label: '',
}

function EditorField(props) {
	const { field, form, label } = props

	function handleEditorChange(value) {
		form.setFieldValue(field.name, value, true)
	}

	function handleEditorBlur() {
		form.setFieldTouched(field.name, true, true)
	}

	return (
		<div className="form-group">
			{label && (
				<label className="label" htmlFor={field.name}>
					{label}
				</label>
			)}
			<Editor
				value={field.value}
				onEditorChange={handleEditorChange}
				onBlur={handleEditorBlur}
				apiKey="rr4jpi2t3raw888x8270475h8c5x3oj8oss1c9z9okdhojcu"
				init={{
					entity_encoding: 'raw',
					height: 500,
					menubar: true,
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount',
					],
					toolbar:
						'undo redo | formatselect | ' +
						'bold italic backcolor image | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | help',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
					image_caption: true,
				}}
			/>
			<ErrorMessage name={field.name}>
				{msg => <p className="error-message">{msg}</p>}
			</ErrorMessage>
		</div>
	)
}

export default EditorField
