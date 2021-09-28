import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as Yup from 'yup'
// COMPONENTS
import { Formik, Form, FastField } from 'formik'
import InputField from 'components/FormFields/InputField'
import SelectField from 'components/FormFields/SelectField'
import TextAreaField from 'components/FormFields/TextAreaField'

const validationSchema = Yup.object().shape({
	subtopic_name: Yup.string().required('Bạn phải nhập tên của chủ đề!'),
	topic_id: Yup.string().required('Bạn phải chọn 1 chủ đề cha!'),
})

EditSubtopicForm.propTypes = {
	topicOptions: PropTypes.array,
	subtopic: PropTypes.object,
	onSubmit: PropTypes.func,
}

EditSubtopicForm.defaultProps = {
	topicOptions: [],
	subtopic: {},
	onSubmit: () => {},
}

function EditSubtopicForm({ subtopic, onSubmit, topicOptions }) {
	return (
		<Formik
			initialValues={{
				topic_id: subtopic.topic_id,
				subtopic_name: subtopic.subtopic_name,
				description: subtopic.description,
			}}
			validationSchema={validationSchema}
			onSubmit={values => onSubmit(values)}
		>
			{() => {
				return (
					<Form className="edit-subtopic-form">
						<h3 className="edit-subtopic-form__title">Cập nhật chủ đề</h3>
						<div className="edit-subtopic-form__row">
							<FastField
								label="Chủ đề cha"
								placeholder="Chọn 1 chủ đề cha"
								options={topicOptions}
								name="topic_id"
								component={SelectField}
							/>
						</div>
						<div className="edit-subtopic-form__row">
							<FastField
								label="Tên chủ đề"
								placeholder="Tên chủ đề"
								name="subtopic_name"
								component={InputField}
							/>
						</div>
						<div className="edit-subtopic-form__row">
							<FastField
								label="Mô tả"
								placeholder="Mô tả"
								name="description"
								component={TextAreaField}
							/>
						</div>
						<div className="edit-subtopic-form__row">
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

export default EditSubtopicForm
