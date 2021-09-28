import React, { useState, useEffect, useMemo } from 'react'
import './style.scss'
// HOOKS
import { useDispatch, useSelector } from 'react-redux'
// COMPONENTS
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import AddIcon from '@material-ui/icons/Add'
import SubtopicTable from 'components/Tables/SubtopicTable'
import AddSubtopicForm from 'components/Forms/AddSubtopicForm'
import EditSubtopicForm from 'components/Forms/EditSubtopicForm'
// ACTIONS
import { getAcceptedTopicList } from 'app/slices/topicsSlice'
import {
	insertSubtopic,
	updateSubtopic,
	deleteSubtopic,
	getSubtopicListByUserId,
} from 'app/slices/subtopicsSlice'
// UTILS
import { sleep } from 'utils/sleep'
import customAlerts from 'utils/customAlerts'

function SubtopicManagement() {
	const [loading, setLoading] = useState(false)
	const [subtopicEdit, setSubtopicEdit] = useState(null)
	const [addSubtopicModal, setAddSubtopicModal] = useState(false)
	const [editSubtopicModal, setEditSubtopicModal] = useState(false)

	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const acceptedTopicList = useSelector(
		state => state.topics.acceptedTopicList.data
	)
	const subtopicList = useSelector(state => state.subtopics.subtopicList.data)

	useEffect(() => {
		dispatch(getAcceptedTopicList())
		dispatch(getSubtopicListByUserId())
	}, [dispatch])

	const topicOptions = useMemo(() => {
		return acceptedTopicList.map(topic => ({
			value: topic.topic_id,
			label: topic.topic_name,
		}))
	}, [acceptedTopicList])

	function handleSubtopicEdit(subtopic) {
		setSubtopicEdit(subtopic)
		setEditSubtopicModal(true)
	}

	async function handleAddSubtopicSubmit(values) {
		const data = {
			...values,
			user_id: user.user_id,
		}
		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(insertSubtopic(data)).unwrap()
			setAddSubtopicModal(false)

			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	async function handleEditSubtopicSubmit(values) {
		const data = {
			...values,
			subtopic_id: subtopicEdit.subtopic_id,
		}
		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(updateSubtopic(data)).unwrap()
			setEditSubtopicModal(false)
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	async function handleSubtopicDelete(subtopicId) {
		const confirmResponse = await customAlerts.confirm(
			'Cảnh báo!',
			'Bạn có chắc là muốn xóa chủ đề này không?'
		)
		if (!confirmResponse.isConfirmed) return

		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(deleteSubtopic(subtopicId)).unwrap()
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	return (
		<div className="subtopic-management">
			<Loading loading={loading} />
			<h1 className="subtopic-management__header">Quản lý chủ đề</h1>
			<div className="subtopic-management__feature">
				<div
					className="add-subtopic-btn"
					onClick={() => setAddSubtopicModal(true)}
				>
					<AddIcon />
					<span>Thêm chủ đề</span>
				</div>
			</div>
			<SubtopicTable
				subtopicList={subtopicList}
				onSubtopicEdit={handleSubtopicEdit}
				onSubtopicDelete={handleSubtopicDelete}
			/>
			<Modal
				openModal={addSubtopicModal}
				onCloseModal={() => setAddSubtopicModal(false)}
			>
				<AddSubtopicForm
					topicOptions={topicOptions}
					onSubmit={handleAddSubtopicSubmit}
				/>
			</Modal>
			<Modal
				openModal={editSubtopicModal}
				onCloseModal={() => setEditSubtopicModal(false)}
			>
				<EditSubtopicForm
					subtopic={subtopicEdit}
					topicOptions={topicOptions}
					onSubmit={handleEditSubtopicSubmit}
				/>
			</Modal>
		</div>
	)
}

export default SubtopicManagement
