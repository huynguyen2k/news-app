import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BoxIcon from 'assets/images/box-icon.png'
// COMPONENTS
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import ViewIcon from '@material-ui/icons/Visibility'
import LabelBadge from 'components/LabelBadge'

NewsTable.propTypes = {
	newsList: PropTypes.array,
	onNewsEdit: PropTypes.func,
	onNewsDelete: PropTypes.func,
	onNewsView: PropTypes.func,
}

NewsTable.defaultProps = {
	newsList: [],
	onNewsEdit: () => {},
	onNewsDelete: () => {},
	onNewsView: () => {},
}

function renderLabelBadge(news) {
	if (news.approve_status) {
		if (news.approve_pass) {
			return <LabelBadge type="success" text="Chấp thuận" />
		}
		return <LabelBadge type="danger" text="Từ chối" />
	}
	return <LabelBadge type="warning" text="Chờ duyệt" />
}

function NewsTable({ newsList, onNewsView, onNewsEdit, onNewsDelete }) {
	function renderControlBtn(news) {
		if (news.approve_status && news.approve_pass) {
			return (
				<div className="news-table__controls">
					<button className="btn btn--success" onClick={() => onNewsView(news)}>
						<ViewIcon />
					</button>
					<button
						className="btn btn--info disabled"
						onClick={() => onNewsEdit(news)}
					>
						<EditIcon />
					</button>
					<button
						className="btn btn--danger disabled"
						onClick={() => onNewsDelete(news.new_id)}
					>
						<DeleteIcon />
					</button>
				</div>
			)
		}
		return (
			<div className="news-table__controls">
				<button className="btn btn--success" onClick={() => onNewsView(news)}>
					<ViewIcon />
				</button>
				<button className="btn btn--info" onClick={() => onNewsEdit(news)}>
					<EditIcon />
				</button>
				<button
					className="btn btn--danger"
					onClick={() => onNewsDelete(news.new_id)}
				>
					<DeleteIcon />
				</button>
			</div>
		)
	}

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
					<td>{news.title}</td>
					<td>{news.description}</td>
					<td>{renderLabelBadge(news)}</td>
					<td>{news.approve_desc}</td>
					<td>{renderControlBtn(news)}</td>
				</tr>
			)
		})
	}

	return (
		<table className="news-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Tiêu đề</th>
					<th>Mô tả</th>
					<th>Trạng thái</th>
					<th>Phản hồi</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>{renderNewsList()}</tbody>
		</table>
	)
}

export default NewsTable
