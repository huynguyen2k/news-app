import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as Yup from 'yup'
// COMPONENTS
import { Formik, Form, FastField } from 'formik'
import InputField from 'components/FormFields/InputField'
import TextAreaField from 'components/FormFields/TextAreaField'

const validationSchema = Yup.object().shape({
	topic_name: Yup.string().required('Bạn phải nhập tên của chủ đề'),
})

EditTopicForm.propTypes = {
	topic: PropTypes.object,
	onSubmit: PropTypes.func,
}

EditTopicForm.defaultProps = {
	topic: {},
	onSubmit: () => {},
}

function EditTopicForm({ topic, onSubmit }) {
	return (
		<Formik
			initialValues={{
				topic_id: topic.topic_id,
				topic_name: topic.topic_name,
				description: topic.description,
			}}
			validationSchema={validationSchema}
			onSubmit={values => onSubmit(values)}
		>
			{() => {
				return (
					<Form className="edit-topic-form">
						<h3 className="edit-topic-form__title">Cập nhật chủ đề</h3>
						<div className="edit-topic-form__row">
							<FastField
								label="Tên chủ đề"
								placeholder="Tên chủ đề"
								name="topic_name"
								component={InputField}
							/>
						</div>
						<div className="edit-topic-form__row">
							<FastField
								label="Mô tả"
								placeholder="Mô tả"
								name="description"
								component={TextAreaField}
							/>
						</div>
						<div className="edit-topic-form__row">
							<div className="form-group">
								<button type="submit" className="submit-btn">
									Cập nhật
								</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default EditTopicForm
