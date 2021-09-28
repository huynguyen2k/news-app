import React, { useState, useEffect } from 'react'
import './style.scss'
// HOOKS
import { useDispatch, useSelector } from 'react-redux'
// COMPONENTS
import Loading from 'components/Loading'
import AddIcon from '@material-ui/icons/Add'
import TopicTable from 'components/Tables/TopicTable'
import Modal from 'components/Modal'
import AddTopicForm from 'components/Forms/AddTopicForm'
import EditTopicForm from 'components/Forms/EditTopicForm'
// ACTIONS
import {
	getTopicListByUserId,
	insertTopic,
	updateTopic,
	deleteTopic,
	setTopicEdit,
} from 'app/slices/topicsSlice'
// UTILS
import { sleep } from 'utils/sleep'
import customAlerts from 'utils/customAlerts'

function TopicManagementPage() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const topicList = useSelector(state => state.topics.topicList.data)
	const topicEdit = useSelector(state => state.topics.topicEdit)

	const [loading, setLoading] = useState(false)

	const [addTopicModal, setAddTopicModal] = useState(false)
	const [editTopicModal, setEditTopicModal] = useState(false)

	useEffect(() => {
		dispatch(getTopicListByUserId())
	}, [dispatch])

	async function handleAddTopicSubmit(values) {
		const newTopic = {
			...values,
			user_id: user.user_id,
		}

		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(insertTopic(newTopic)).unwrap()

			setAddTopicModal(false)
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	async function handleTopicEdit(topic) {
		setEditTopicModal(true)
		dispatch(setTopicEdit(topic))
	}

	async function handleEditTopicSubmit(values) {
		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(updateTopic(values)).unwrap()

			setEditTopicModal(false)
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	async function handleTopicDelete(topicId) {
		const confirmResponse = await customAlerts.confirm(
			'Cảnh báo!',
			'Bạn có chắc là muốn xóa chủ đề này không?'
		)
		if (!confirmResponse.isConfirmed) return

		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(deleteTopic(topicId)).unwrap()
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	return (
		<div className="topic-management">
			<Loading loading={loading} />
			<h1 className="topic-management__header">Quản lý chủ đề</h1>
			<div className="topic-management__feature">
				<div className="add-topic-btn" onClick={() => setAddTopicModal(true)}>
					<AddIcon />
					<span>Thêm chủ đề</span>
				</div>
			</div>
			<TopicTable
				topicList={topicList}
				onTopicEdit={handleTopicEdit}
				onTopicDelete={handleTopicDelete}
			/>
			<Modal
				openModal={addTopicModal}
				onCloseModal={() => setAddTopicModal(false)}
			>
				<AddTopicForm onSubmit={handleAddTopicSubmit} />
			</Modal>
			<Modal
				openModal={editTopicModal}
				onCloseModal={() => setEditTopicModal(false)}
			>
				<EditTopicForm topic={topicEdit} onSubmit={handleEditTopicSubmit} />
			</Modal>
		</div>
	)
}

export default TopicManagementPage
