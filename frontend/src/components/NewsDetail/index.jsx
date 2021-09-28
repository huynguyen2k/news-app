import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// UTILS
import getDateTimeFormat from 'utils/getDateTimeFormat'

NewsDetail.propTypes = {
	news: PropTypes.object,
}

NewsDetail.defaultProps = {
	news: null,
}

function NewsDetail({ news }) {
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
		<div className="news-detail">
			<div className="news-detail__news-info">
				<ul className="news-detail__topic-list">{renderNewsTopics()}</ul>
				<div className="news-detail__date-time">
					<span className="date-time">
						{getDateTimeFormat(news.created_on)}
					</span>
					<span className="author">Tác giả: {news.author}</span>
				</div>
			</div>
			<h1 className="news-detail__title">{news.title}</h1>
			<div
				className="news-detail__content"
				dangerouslySetInnerHTML={{ __html: news.content }}
			/>
		</div>
	)
}

export default NewsDetail
