import React, { useState, useEffect } from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
// COMPONENTS
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import ViewNewsDetail from 'components/ViewNewsDetail'
import ApproveNewsTable from 'components/Tables/ApproveNewsTable'
// ACTIONSs
import { approveNews, getUnapprovedNewsList } from 'app/slices/newsSlice'
// UTILS
import { sleep } from 'utils/sleep'
import customAlerts from 'utils/customAlerts'
import ResponseNewsForm from 'components/Forms/ResponseNewsForm'

function ApproveNewsPage() {
	const [loading, setLoading] = useState(false)
	const [newsDetail, setNewsDetail] = useState(null)
	const [viewNewsModal, setViewNewsModal] = useState(false)
	const [denyNewsData, setDenyNewsData] = useState(null)
	const [responseNewsModal, setResponseNewsModal] = useState(false)

	const dispatch = useDispatch()
	const unapprovedNewsList = useSelector(
		state => state.news.unapprovedNewsList.data
	)

	useEffect(() => {
		dispatch(getUnapprovedNewsList())
	}, [dispatch])

	function handleNewsView(news) {
		setNewsDetail(news)
		setViewNewsModal(true)
	}

	async function handleNewsApprove(data) {
		setLoading(true)
		await sleep(1000)

		try {
			const response = await dispatch(approveNews(data)).unwrap()
			customAlerts.success('Thành công!', response.message)
		} catch (err) {
			customAlerts.error('Cảnh báo!', err.message)
		}
		setLoading(false)
	}

	function handleNewsAccept(newsId) {
		handleNewsApprove({
			new_id: newsId,
			approve_status: true,
			approve_pass: true,
			approve_desc: '',
		})
	}

	async function handleNewsDeny(newsId) {
		const confirmReponse = await customAlerts.infoConfirm(
			'Xác nhận!',
			'Bạn muốn muốn gửi phản hồi cho tác giả không?'
		)
		const data = {
			new_id: newsId,
			approve_status: true,
			approve_pass: false,
			approve_desc: '',
		}

		if (confirmReponse.isConfirmed) {
			await sleep(250)
			setDenyNewsData(data)
			setResponseNewsModal(true)
			return
		}
		handleNewsApprove(data)
	}

	async function handleResponseNewsSubmit(values) {
		const data = {
			...denyNewsData,
			approve_desc: values.approve_desc,
		}
		await handleNewsApprove(data)
		setResponseNewsModal(false)
	}

	return (
		<div className="approve-news">
			<Loading loading={loading} />
			<h1 className="approve-news__header">Duyệt bản tin</h1>
			<ApproveNewsTable
				newsList={unapprovedNewsList}
				onNewsView={handleNewsView}
				onNewsAccept={handleNewsAccept}
				onNewsDeny={handleNewsDeny}
			/>
			<Modal
				openModal={viewNewsModal}
				onCloseModal={() => setViewNewsModal(false)}
			>
				<ViewNewsDetail news={newsDetail} />
			</Modal>
			<Modal openModal={responseNewsModal}>
				<ResponseNewsForm onSubmit={handleResponseNewsSubmit} />
			</Modal>
		</div>
	)
}

export default ApproveNewsPage
