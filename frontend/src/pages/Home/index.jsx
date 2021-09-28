import React, { useEffect } from 'react'
import './style.scss'
// HOOKS
import { useDispatch, useSelector } from 'react-redux'
// COMPONENTS
import NewsGrid from 'components/NewsGrid'
import Container from '@material-ui/core/Container'
// ACTIONS
import { getAcceptedLatestNews } from 'app/slices/newsSlice'

function HomePage() {
	const dispatch = useDispatch()
	const latestNews = useSelector(state => state.news.latestNews.data)

	useEffect(() => {
		dispatch(getAcceptedLatestNews())
	}, [dispatch])

	return (
		<div className="home-page">
			<section className="home-page__section">
				<Container fixed>
					<div className="home-page__section-header">
						<h2 className="title">Các tin mới nhất</h2>
						<div className="line"></div>
					</div>
					<div className="home-page__section-body">
						<NewsGrid newsList={latestNews} />
					</div>
				</Container>
			</section>
		</div>
	)
}

export default HomePage
