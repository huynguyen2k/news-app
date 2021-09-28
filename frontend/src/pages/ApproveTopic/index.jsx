import React, { useState, useEffect } from 'react'
import './style.scss'
// HOOKS
import { useSelector, useDispatch } from 'react-redux'
// COMPONENTS
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import ApproveTopicTable from 'components/Tables/ApproveTopicTable'
import ResponseTopicForm from 'components/Forms/ResponseTopicForm'
// ACTIONS
import { approveTopic, getUnapprovedTopicList } from 'app/slices/topicsSlice'
// UTILS
import { sleep } from 'utils/sleep'
import customAlerts from 'utils/customAlerts'

function ApproveTopicPage() {
	const [loading, setLoading] = useState(false)

	const [denyTopicData, setDenyTopicData] = useState(null)
	const [responseTopicModal, setResponseTopicModal] = useState(false)

	const dispatch = useDispatch()
	const unapprovedTopicList = useSelector(
		state => state.topics.unapprovedTopicList.data
	)

	useEffect(() => {
		dispatch(getUnapprovedTopicList())
	}, [dispatch])

	async function handleApproveTopic(data) {
		setLoading(true)
		await sleep(1000)

		try {
			const response = await dispatch(approveTopic(data)).unwrap()
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	function handleTopicAccept(topicId) {
		handleApproveTopic({
			topic_id: topicId,
			approve_status: true,
			approve_pass: true,
			approve_desc: '',
		})
	}

	async function handleTopicDeny(topicId) {
		const confirmReponse = await customAlerts.infoConfirm(
			'Xác nhận!',
			'Bạn muốn muốn gửi phản hồi cho tác giả không?'
		)
		const data = {
			topic_id: topicId,
			approve_status: true,
			approve_pass: false,
			approve_desc: '',
		}

		if (confirmReponse.isConfirmed) {
			await sleep(250)
			setResponseTopicModal(true)
			setDenyTopicData(data)
			return
		}
		handleApproveTopic(data)
	}

	async function handleResponseTopicSubmit(values) {
		const data = {
			...denyTopicData,
			approve_desc: values.approve_desc,
		}
		await handleApproveTopic(data)
		setResponseTopicModal(false)
	}

	return (
		<div className="approve-topic">
			<Loading loading={loading} />
			<h1 className="approve-topic__header">Duyệt chủ đề</h1>
			<ApproveTopicTable
				topicList={unapprovedTopicList}
				onTopicAccept={handleTopicAccept}
				onTopicDeny={handleTopicDeny}
			/>
			<Modal openModal={responseTopicModal}>
				<ResponseTopicForm onSubmit={handleResponseTopicSubmit} />
			</Modal>
		</div>
	)
}

export default ApproveTopicPage
