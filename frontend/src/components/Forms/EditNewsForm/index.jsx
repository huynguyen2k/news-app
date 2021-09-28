import React, { useState, useEffect } from 'react'
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

EditNewsForm.propsTypes = {
	news: PropTypes.object,
	topicsOptions: PropTypes.array,
	subtopicList: PropTypes.array,
	onSubmit: PropTypes.func,
}

EditNewsForm.defaultProps = {
	news: null,
	topicOptions: [],
	subtopicList: [],
	onSubmit: () => {},
}

const validationSchema = Yup.object({
	title: Yup.string().required('Bạn phải nhập tiêu đề cho bản tin!'),
	description: Yup.string().required('Bạn phải nhập mô tả cho bản tin!'),
	content: Yup.string().required('Bạn phải nhập nội dung cho bản tin!'),
	topic_id: Yup.number()
		.required('Bạn phải chọn 1 chủ đề chính cho bản tin!')
		.nullable(),
})

function EditNewsForm(props) {
	const { news, topicOptions, subtopicList, onSubmit } = props
	const [subtopicOptions, setSubtopicOptions] = useState([])

	useEffect(() => {
		if (!news) return

		setSubtopicOptions(() => {
			return subtopicList
				.filter(subtopic => subtopic.topic_id === news.topic_id)
				.map(subtopic => ({
					value: subtopic.subtopic_id,
					label: subtopic.subtopic_name,
				}))
		})
	}, [subtopicList, news])

	if (!news) return null
	return (
		<Formik
			initialValues={{
				new_id: news.new_id,
				title: news.title,
				description: news.description,
				content: news.content,
				image: null,
				topic_id: news.topic_id,
				subtopics: news.subtopics.map(subtopic => subtopic.subtopic_id),
			}}
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
					<Form className="edit-news-form">
						<h3 className="edit-news-form__title">Cập nhật bản tin</h3>
						<div className="edit-news-form__row">
							<FastField
								label="Ảnh bài viết"
								src={news.image}
								name="image"
								component={FileField}
							/>
						</div>
						<div className="edit-news-form__row">
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
						<div className="edit-news-form__row">
							<FastField
								label="Tiêu đề"
								placeholder="Tiêu đề bài viết"
								name="title"
								component={InputField}
							/>
						</div>
						<div className="edit-news-form__row">
							<FastField
								label="Mô tả"
								placeholder="Mô tả ngắn về bài viết"
								name="description"
								component={TextAreaField}
							/>
						</div>
						<div className="edit-news-form__row">
							<FastField
								label="Nội dung bài viết"
								name="content"
								component={EditorField}
							/>
						</div>
						<div className="edit-news-form__row">
							<div className="form-group">
								<button type="submit" className="submit-btn">
									Cập nhật bản tin
								</button>
							</div>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default EditNewsForm
