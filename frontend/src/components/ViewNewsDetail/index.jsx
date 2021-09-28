import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// UTILS
import getDateTimeFormat from 'utils/getDateTimeFormat'

ViewNewsDetail.propTypes = {
	news: PropTypes.object,
}

ViewNewsDetail.defaultProps = {
	news: null,
}

function ViewNewsDetail({ news }) {
	function renderNewsTopics() {
		const result = []
		result.push(<li key={0}>{news.topic_name}</li>)
		const subtopics = news.subtopics.map((subtopic, index) => {
			return (
				<li key={index + 1}>
					<span>/</span>
					{subtopic.subtopic_name}
				</li>
			)
		})
		return [...result, ...subtopics]
	}

	if (!news) return null
	return (
		<div className="view-news-detail">
			<div className="view-news-detail__news-info">
				<ul className="view-news-detail__topic-list">{renderNewsTopics()}</ul>
				<div className="view-news-detail__date-time">
					<span className="date-time">
						{getDateTimeFormat(news.created_on)}
					</span>
					<span className="author">Tác giả: {news.author}</span>
				</div>
			</div>
			<h1 className="view-news-detail__title">{news.title}</h1>
			<div
				className="view-news-detail__content"
				dangerouslySetInnerHTML={{ __html: news.content }}
			/>
		</div>
	)
}

export default ViewNewsDetail
