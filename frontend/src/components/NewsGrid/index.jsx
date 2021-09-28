import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// COMPONENTS
import Grid from '@material-ui/core/Grid'
import NewsCard from 'components/NewsCard'

NewsGrid.propTypes = {
	newsList: PropTypes.array,
}

NewsGrid.defaultProps = {
	newsList: [],
}

function NewsGrid({ newsList }) {
	return (
		<Grid container spacing={2}>
			{newsList.map(news => (
				<Grid key={news.new_id} item xs={3}>
					<NewsCard news={news} />
				</Grid>
			))}
		</Grid>
	)
}

export default NewsGrid
