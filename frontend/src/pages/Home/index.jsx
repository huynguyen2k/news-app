import React, { useEffect, useMemo, useState } from 'react'
import './style.scss'
// HOOKS
import { useDispatch, useSelector } from 'react-redux'
// COMPONENTS
import NewsGrid from 'components/NewsGrid'
import Container from '@material-ui/core/Container'
// ACTIONS
import { getAcceptedLatestNews } from 'app/slices/newsSlice'
import { Pagination } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
	paginationBox: {
		marginTop: '32px',
	},
	pagination: {
		'& .MuiPagination-ul': {
			justifyContent: 'flex-end',
		},
	},
})

function HomePage() {
	const classes = useStyles()
	const dispatch = useDispatch()
	const latestNews = useSelector(state => state.news.latestNews.data)

	const [pagination, setPagination] = useState({
		page: 1,
		total: 0,
		limit: 12,
	})

	const filterNews = useMemo(() => {
		return latestNews.slice(
			(pagination.page - 1) * pagination.limit,
			pagination.page * pagination.limit
		)
	}, [latestNews, pagination])

	useEffect(() => {
		dispatch(getAcceptedLatestNews())
	}, [dispatch])

	useEffect(() => {
		setPagination(prevPagination => ({
			...prevPagination,
			total: latestNews.length,
		}))
	}, [latestNews])

	const handlePageChange = (event, newPage) => {
		setPagination(prevPagination => ({
			...prevPagination,
			page: newPage,
		}))
	}

	return (
		<div className="home-page">
			<section className="home-page__section">
				<Container fixed>
					<div className="home-page__section-header">
						<h2 className="title">Các tin mới nhất</h2>
						<div className="line"></div>
					</div>

					<div className="home-page__section-body">
						<NewsGrid newsList={filterNews} />
					</div>

					<Box className={classes.paginationBox}>
						<Pagination
							page={pagination.page}
							count={Math.ceil(pagination.total / pagination.limit)}
							boundaryCount={1}
							siblingCount={1}
							size="medium"
							onChange={handlePageChange}
							className={classes.pagination}
						/>
					</Box>
				</Container>
			</section>
		</div>
	)
}

export default HomePage
