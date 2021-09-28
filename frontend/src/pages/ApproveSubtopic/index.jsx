import React, { useState, useEffect } from 'react'
import './style.scss'
// HOOKS
import { useSelector, useDispatch } from 'react-redux'
// COMPONENTS
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import ApproveSubtopicTable from 'components/Tables/ApproveSubtopicTable'
// UTILS
import { sleep } from 'utils/sleep'
import customAlerts from 'utils/customAlerts'
// ACTIONS
import {
	approveSubtopic,
	getUnapprovedSubtopicList,
} from 'app/slices/subtopicsSlice'
import ResponseSubtopicForm from 'components/Forms/ResponseSubtopicForm'

function ApproveSubtopicPage() {
	const [loading, setLoading] = useState(false)
	const [responseSubtopicModal, setResponseSubtopicModal] = useState(false)
	const [denySubtopicData, setDenySubtopicData] = useState(null)

	const dispatch = useDispatch()
	const unapprovedSubtopicList = useSelector(
		state => state.subtopics.unapprovedSubtopicList.data
	)

	useEffect(() => {
		dispatch(getUnapprovedSubtopicList())
	}, [dispatch])

	async function handleApproveSubtopic(data) {
		setLoading(true)
		await sleep(1000)
		try {
			const response = await dispatch(approveSubtopic(data)).unwrap()
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	function handleSubtopicAccept(subtopicId) {
		handleApproveSubtopic({
			subtopic_id: subtopicId,
			approve_status: true,
			approve_pass: true,
			approve_desc: '',
		})
	}

	async function handleSubtopicDeny(subtopicId) {
		const confirmReponse = await customAlerts.infoConfirm(
			'Xác nhận!',
			'Bạn muốn muốn gửi phản hồi cho tác giả không?'
		)
		const data = {
			subtopic_id: subtopicId,
			approve_status: true,
			approve_pass: false,
			approve_desc: '',
		}

		if (confirmReponse.isConfirmed) {
			await sleep(250)
			setDenySubtopicData(data)
			setResponseSubtopicModal(true)
			return
		}
		handleApproveSubtopic(data)
	}

	async function handleResponseSubtopicSubmit(values) {
		const data = {
			...denySubtopicData,
			approve_desc: values.approve_desc,
		}
		await handleApproveSubtopic(data)
		setResponseSubtopicModal(false)
	}

	return (
		<div className="approve-subtopic">
			<Loading loading={loading} />
			<h1 className="approve-subtopic__header">Duyệt chủ đề</h1>
			<ApproveSubtopicTable
				subtopicList={unapprovedSubtopicList}
				onSubtopicAccept={handleSubtopicAccept}
				onSubtopicDeny={handleSubtopicDeny}
			/>
			<Modal openModal={responseSubtopicModal}>
				<ResponseSubtopicForm onSubmit={handleResponseSubtopicSubmit} />
			</Modal>
		</div>
	)
}

export default ApproveSubtopicPage
