import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Link } from 'react-router-dom'

NewsList.propTypes = {
	title: PropTypes.string,
	newsList: PropTypes.array,
}

NewsList.defaultProps = {
	title: '',
	newsList: [],
}

function NewsList({ title, newsList }) {
	if (!newsList.length) return null
	return (
		<div className="news-list">
			{title && <h3 className="news-list__title">{title}</h3>}
			{newsList.map(news => (
				<div key={news.new_id} className="news-list__item">
					<div className="image">
						<img src={news.image} alt={news.title} />
					</div>
					<div className="info">
						<Link className="title" to={`/news-detail/${news.new_id}`}>
							{news.title}
						</Link>
						<p className="description">{news.description}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default NewsList
