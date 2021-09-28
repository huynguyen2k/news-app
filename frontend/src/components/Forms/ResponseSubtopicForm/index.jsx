import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import { Formik, Form, FastField } from 'formik'
import TextAreaField from 'components/FormFields/TextAreaField'

const initialValues = {
	approve_desc: '',
}

ResponseSubtopicForm.propTypes = {
	onSubmit: PropTypes.func,
}

ResponseSubtopicForm.defaultProps = {
	onSubmit: () => {},
}

function ResponseSubtopicForm({ onSubmit }) {
	return (
		<Formik initialValues={initialValues} onSubmit={values => onSubmit(values)}>
			<Form className="response-subtopic-form">
				<h3 className="response-subtopic-form__title">Phản hồi</h3>
				<div className="response-subtopic-form__row">
					<FastField
						label="Chi tiết"
						placeholder="Viết chi tiết phản hồi của bạn ở đây!"
						name="approve_desc"
						component={TextAreaField}
					/>
				</div>
				<div className="response-subtopic-form__row">
					<div className="form-group">
						<button type="submit" className="submit-btn">
							Gửi
						</button>
					</div>
				</div>
			</Form>
		</Formik>
	)
}

export default ResponseSubtopicForm
