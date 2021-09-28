import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as Yup from 'yup'
// COMPONENTS
import { Formik, Form, FastField } from 'formik'
import InputField from 'components/FormFields/InputField'
import SelectField from 'components/FormFields/SelectField'
import TextAreaField from 'components/FormFields/TextAreaField'

const initialValues = {
	topic_id: null,
	subtopic_name: '',
	description: '',
}

const validationSchema = Yup.object().shape({
	topic_id: Yup.number().required('Bạn phải chọn 1 chủ đề chính!').nullable(),
	subtopic_name: Yup.string().required('Bạn phải nhập tên của chủ đề!'),
})

AddSubtopicForm.propTypes = {
	topicOptions: PropTypes.array,
	onSubmit: PropTypes.func,
}

AddSubtopicForm.defaultProps = {
	topicOptions: [],
	onSubmit: () => {},
}

function AddSubtopicForm({ topicOptions, onSubmit }) {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={values => onSubmit(values)}
		>
			{() => {
				return (
					<Form className="add-subtopic-form">
						<h3 className="add-subtopic-form__title">Thêm chủ đề phụ</h3>
						<div className="add-subtopic-form__row">
							<FastField
								label="Chủ đề chính"
								placeholder="Chọn 1 chủ đề chính"
								options={topicOptions}
								name="topic_id"
								component={SelectField}
							/>
						</div>
						<div className="add-subtopic-form__row">
							<FastField
								label="Tên chủ đề phụ"
								placeholder="Tên chủ đề phụ"
								name="subtopic_name"
								component={InputField}
							/>
						</div>
						<div className="add-subtopic-form__row">
							<FastField
								label="Mô tả"
								placeholder="Mô tả"
								name="description"
								component={TextAreaField}
							/>
						</div>
						<div className="add-subtopic-form__row">
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

export default AddSubtopicForm
