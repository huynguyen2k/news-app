import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Link } from 'react-router-dom'

NewsCard.propTypes = {
	news: PropTypes.object,
}

NewsCard.defaultProps = {
	news: null,
}

function NewsCard({ news }) {
	if (!news) return null
	return (
		<div className="news-card">
			<div className="news-card__image">
				<img src={news.image} alt={news.title} />
			</div>
			<div className="news-card__info">
				<Link className="news-title" to={`/news-detail/${news.new_id}`}>
					{news.title}
				</Link>
				<p className="news-description">{news.description}</p>
			</div>
		</div>
	)
}

export default NewsCard
