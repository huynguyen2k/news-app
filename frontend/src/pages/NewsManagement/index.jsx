import React, { useState, useEffect, useMemo } from 'react'
import './style.scss'
// HOOKS
import { useDispatch, useSelector } from 'react-redux'
// COMPONENTS
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import AddPostIcon from '@material-ui/icons/PostAdd'
import NewsTable from 'components/Tables/NewsTable'
import AddNewsForm from 'components/Forms/AddNewsForm'
import ViewNewsDetail from 'components/ViewNewsDetail'
import EditNewsForm from 'components/Forms/EditNewsForm'
// UTILS
import { sleep } from 'utils/sleep'
import customAlerts from 'utils/customAlerts'
import getDateTime from 'utils/getDateTime'
// ACTIONS
import {
	deleteNews,
	getNewsListByUserId,
	insertNews,
	updateNews,
} from 'app/slices/newsSlice'
import { getAcceptedTopicList } from 'app/slices/topicsSlice'
import { getAcceptedSubtopicList } from 'app/slices/subtopicsSlice'

function NewsManagement() {
	const [loading, setLoading] = useState(false)
	const [addNewsModal, setAddNewsModal] = useState(false)
	const [newsEdit, setNewsEdit] = useState({
		data: null,
		openModal: false,
	})
	const [viewNewsModal, setViewNewsModal] = useState(false)
	const [newsDetail, setNewsDetail] = useState(null)

	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const newsList = useSelector(state => state.news.newsList.data)
	const topicList = useSelector(state => state.topics.acceptedTopicList.data)
	const acceptedSubtopicList = useSelector(
		state => state.subtopics.acceptedSubtopicList.data
	)

	const topicOptions = useMemo(() => {
		return topicList.map(topic => ({
			value: topic.topic_id,
			label: topic.topic_name,
		}))
	}, [topicList])

	useEffect(() => {
		dispatch(getNewsListByUserId())
		dispatch(getAcceptedTopicList())
		dispatch(getAcceptedSubtopicList())
	}, [dispatch])

	async function handleAddNewsSubmit(values) {
		const formData = new FormData()
		formData.append('title', values.title)
		formData.append('description', values.description)
		formData.append('content', values.content)
		formData.append('topic_id', values.topic_id)
		formData.append('subtopics', JSON.stringify(values.subtopics))
		formData.append('image', values.image)
		formData.append('user_id', user.user_id)
		formData.append('created_on', getDateTime())

		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(insertNews(formData)).unwrap()
			setAddNewsModal(false)
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	async function handleEditNewsSubmit(values) {
		const formData = new FormData()
		formData.append('new_id', values.new_id)
		formData.append('title', values.title)
		formData.append('description', values.description)
		formData.append('content', values.content)
		formData.append('topic_id', values.topic_id)
		formData.append('subtopics', JSON.stringify(values.subtopics))
		if (values.image) {
			formData.append('image', values.image)
		}

		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(updateNews(formData)).unwrap()
			setNewsEdit({
				openModal: false,
				data: null,
			})
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	function handleNewsView(news) {
		setViewNewsModal(true)
		setNewsDetail(news)
	}

	function handleNewsEdit(news) {
		setNewsEdit({
			openModal: true,
			data: news,
		})
	}

	async function handleNewsDelete(newsId) {
		const confirm = await customAlerts.confirm(
			'Cảnh báo!',
			'Bạn có chắc là muốn xóa bản tin này không?'
		)
		if (!confirm.isConfirmed) return

		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(deleteNews(newsId)).unwrap()
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	return (
		<div className="news-management">
			<Loading loading={loading} />
			<h1 className="news-management__header">Quản lý bản tin</h1>
			<div className="news-management__feature">
				<div className="add-news-btn" onClick={() => setAddNewsModal(true)}>
					<AddPostIcon />
					<span>Thêm bản tin</span>
				</div>
			</div>
			<NewsTable
				newsList={newsList}
				onNewsView={handleNewsView}
				onNewsEdit={handleNewsEdit}
				onNewsDelete={handleNewsDelete}
			/>
			<Modal
				openModal={addNewsModal}
				onCloseModal={() => setAddNewsModal(false)}
			>
				<AddNewsForm
					topicOptions={topicOptions}
					subtopicList={acceptedSubtopicList}
					onSubmit={handleAddNewsSubmit}
				/>
			</Modal>
			<Modal
				openModal={viewNewsModal}
				onCloseModal={() => setViewNewsModal(false)}
			>
				<ViewNewsDetail news={newsDetail} />
			</Modal>
			<Modal
				openModal={newsEdit.openModal}
				onCloseModal={() =>
					setNewsEdit({
						data: null,
						openModal: false,
					})
				}
			>
				<EditNewsForm
					news={newsEdit.data}
					topicOptions={topicOptions}
					subtopicList={acceptedSubtopicList}
					onSubmit={handleEditNewsSubmit}
				/>
			</Modal>
		</div>
	)
}

export default NewsManagement
