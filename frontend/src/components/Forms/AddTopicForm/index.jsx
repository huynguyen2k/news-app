import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as Yup from 'yup'
// COMPONENTS
import { Formik, Form, FastField } from 'formik'
import InputField from 'components/FormFields/InputField'
import TextAreaField from 'components/FormFields/TextAreaField'

const initialValues = {
	topic_name: '',
	description: '',
}

const validationSchema = Yup.object().shape({
	topic_name: Yup.string().required('Bạn phải nhập tên của chủ đề'),
})

AddTopicForm.propTypes = {
	onSubmit: PropTypes.func,
}

AddTopicForm.defaultProps = {
	onSubmit: () => {},
}

function AddTopicForm({ onSubmit }) {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={values => onSubmit(values)}
		>
			{() => {
				return (
					<Form className="add-topic-form">
						<h3 className="add-topic-form__title">Thêm chủ đề</h3>
						<div className="add-topic-form__row">
							<FastField
								label="Tên chủ đề"
								placeholder="Tên chủ đề"
								name="topic_name"
								component={InputField}
							/>
						</div>
						<div className="add-topic-form__row">
							<FastField
								label="Mô tả"
								placeholder="Mô tả"
								name="description"
								component={TextAreaField}
							/>
						</div>
						<div className="add-topic-form__row">
							<div className="form-group">
								<button type="submit" className="submit-btn">
									Thêm chủ đề
								</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default AddTopicForm
