import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BoxIcon from 'assets/images/box-icon.png'
// COMPONENTS
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import ViewIcon from '@material-ui/icons/Visibility'

ApproveNewsTable.propTypes = {
	newsList: PropTypes.array,
	onNewsAccept: PropTypes.func,
	onNewsDeny: PropTypes.func,
	onNewsView: PropTypes.func,
}

ApproveNewsTable.defaultProps = {
	newsList: [],
	onNewsAccept: () => {},
	onNewsDeny: () => {},
	onNewsView: () => {},
}

function ApproveNewsTable(props) {
	const { newsList, onNewsAccept, onNewsDeny, onNewsView } = props

	function renderNewsList() {
		if (newsList.length === 0) {
			return (
				<tr>
					<td colSpan={6}>
						<div className="empty-data">
							<img src={BoxIcon} alt="box icon" />
							<span>Không có dữ liệu</span>
						</div>
					</td>
				</tr>
			)
		}
		return newsList.map((news, index) => {
			return (
				<tr key={news.new_id}>
					<td>{index + 1}</td>
					<td>
						<img className="news-img" src={news.image} alt={news.title} />
					</td>
					<td>{news.title}</td>
					<td>{news.description}</td>
					<td>{news.author}</td>
					<td>
						<div className="approve-news-table__controls">
							<button
								type="button"
								className="btn btn--success"
								onClick={() => onNewsView(news)}
							>
								<ViewIcon />
							</button>
							<button
								type="button"
								className="btn btn--success"
								onClick={() => onNewsAccept(news.new_id)}
							>
								<CheckIcon />
							</button>
							<button
								type="button"
								className="btn btn--danger"
								onClick={() => onNewsDeny(news.new_id)}
							>
								<CloseIcon />
							</button>
						</div>
					</td>
				</tr>
			)
		})
	}

	return (
		<table className="approve-news-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Hình ảnh</th>
					<th>Tiêu đề</th>
					<th>Mô tả</th>
					<th>Tác giả</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>{renderNewsList()}</tbody>
		</table>
	)
}

export default ApproveNewsTable
