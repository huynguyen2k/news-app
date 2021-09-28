import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as Yup from 'yup'
// COMPONENTS
import { Formik, Form, FastField, Field } from 'formik'
import InputField from 'components/FormFields/InputField'
import TextAreaField from 'components/FormFields/TextAreaField'
import FileField from 'components/FormFields/FileField'
import MultiSelectField from 'components/FormFields/MultiSelectField'
import SelectTopicField from 'components/FormFields/SelectTopicField'
import EditorField from 'components/FormFields/EditorField'

AddNewsForm.propTypes = {
	topicOptions: PropTypes.array,
	subtopicList: PropTypes.array,
	onSubmit: PropTypes.func,
}

AddNewsForm.defaultProps = {
	topicOptions: [],
	subtopicList: [],
	onSubmit: () => {},
}

const initialValues = {
	title: '',
	description: '',
	content: '',
	image: null,
	topic_id: null,
	subtopics: [],
}

const validationSchema = Yup.object({
	title: Yup.string().required('Bạn phải nhập tiêu đề cho bản tin!'),
	description: Yup.string().required('Bạn phải nhập mô tả cho bản tin!'),
	content: Yup.string().required('Bạn phải nhập nội dung cho bản tin!'),
	image: Yup.object()
		.transform((value, originalValue) => {
			if (originalValue) {
				return {}
			}
			return null
		})
		.required('Bạn phải chọn ảnh đại diện cho bản tin!')
		.nullable(),
	topic_id: Yup.number()
		.required('Bạn phải chọn 1 chủ đề chính cho bản tin!')
		.nullable(),
})

function AddNewsForm({ topicOptions, subtopicList, onSubmit }) {
	const [subtopicOptions, setSubtopicOptions] = useState([])
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={values => onSubmit(values)}
		>
			{formik => {
				function handleTopicChange(topicId) {
					formik.setFieldValue('subtopics', [], true)

					setSubtopicOptions(() => {
						return subtopicList
							.filter(subtopic => {
								return subtopic.topic_id === topicId
							})
							.map(subtopic => ({
								value: subtopic.subtopic_id,
								label: subtopic.subtopic_name,
							}))
					})
				}

				return (
					<Form className="add-news-form">
						<h3 className="add-news-form__title">Thêm bản tin</h3>
						<div className="add-news-form__row">
							<FastField
								label="Ảnh bài viết"
								name="image"
								component={FileField}
							/>
						</div>
						<div className="add-news-form__row">
							<Field
								label="Chủ đề chính"
								placeholder="Chọn 1 chủ đề chính cho bài viết"
								options={topicOptions}
								onTopicChange={handleTopicChange}
								name="topic_id"
								component={SelectTopicField}
							/>
							<Field
								label="Chủ đề phụ"
								placeholder="Chọn các chủ đề phụ cho bài viết"
								options={subtopicOptions}
								name="subtopics"
								component={MultiSelectField}
							/>
						</div>
						<div className="add-news-form__row">
							<FastField
								label="Tiêu đề"
								placeholder="Tiêu đề bài viết"
								name="title"
								component={InputField}
							/>
						</div>
						<div className="add-news-form__row">
							<FastField
								label="Mô tả"
								placeholder="Mô tả ngắn về bài viết"
								name="description"
								component={TextAreaField}
							/>
						</div>
						<div className="add-news-form__row">
							<FastField
								label="Nội dung bài viết"
								name="content"
								component={EditorField}
							/>
						</div>
						<div className="add-news-form__row">
							<div className="form-group">
								<button type="submit" className="submit-btn">
									Thêm bản tin
								</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default AddNewsForm
