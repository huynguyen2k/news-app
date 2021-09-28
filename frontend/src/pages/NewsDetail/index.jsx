import React from 'react'
// HOOKS
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// COMPONENTS
import Container from '@material-ui/core/Container'
import NewsDetail from 'components/NewsDetail'
import NewsList from 'components/NewsList'
// ACTIONS
import { getNewsDetailByNewsId } from 'app/slices/newsSlice'
// API
import newsAPI from 'api/newsAPI'

function NewsDetailPage() {
	const { news_id: newsId } = useParams()
	const dispatch = useDispatch()
	const newsDetail = useSelector(state => state.news.newsDetail.data)
	const [newsList, setNewsList] = useState([])

	useEffect(() => {
		dispatch(getNewsDetailByNewsId(newsId))
	}, [dispatch, newsId])

	useEffect(() => {
		;(async () => {
			if (!newsDetail) return
			const response = await newsAPI.getNewsListByTopicId(newsDetail.topic_id)
			const newsList = response.content.filter(
				news => news.new_id !== newsDetail.new_id
			)
			setNewsList(newsList)
		})()
	}, [newsDetail])

	return (
		<div className="news-detail-page">
			<Container fixed>
				<NewsDetail news={newsDetail} />
				<NewsList title="Các tin liên quan" newsList={newsList} />
			</Container>
		</div>
	)
}

export default NewsDetailPage
