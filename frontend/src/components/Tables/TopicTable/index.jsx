import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BoxIcon from 'assets/images/box-icon.png'
// COMPONENTS
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import LabelBadge from 'components/LabelBadge'

TopicTable.propTypes = {
	loading: PropTypes.bool,
	topicList: PropTypes.array,
	onTopicEdit: PropTypes.func,
	onTopicDelete: PropTypes.func,
}

TopicTable.defaultProps = {
	loading: false,
	topicList: [],
	onTopicEdit: () => {},
	onTopicDelete: () => {},
}

function renderLabelBadge(topic) {
	if (topic.approve_status) {
		if (topic.approve_pass) {
			return <LabelBadge type="success" text="Chấp thuận" />
		}
		return <LabelBadge type="danger" text="Từ chối" />
	}
	return <LabelBadge type="warning" text="Chờ duyệt" />
}

function TopicTable({ topicList, onTopicEdit, onTopicDelete }) {
	function renderControlBtn(topic) {
		if (topic.approve_status && topic.approve_pass) {
			return (
				<div className="topic-table__controls">
					<button
						className="btn btn--info disabled"
						onClick={() => onTopicEdit(topic)}
					>
						<EditIcon />
					</button>
					<button
						className="btn btn--danger disabled"
						onClick={() => onTopicDelete(topic.topic_id)}
					>
						<DeleteIcon />
					</button>
				</div>
			)
		}
		return (
			<div className="topic-table__controls">
				<button className="btn btn--info" onClick={() => onTopicEdit(topic)}>
					<EditIcon />
				</button>
				<button
					className="btn btn--danger"
					onClick={() => onTopicDelete(topic.topic_id)}
				>
					<DeleteIcon />
				</button>
			</div>
		)
	}

	function renderTopicList() {
		if (topicList.length === 0) {
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

		return topicList.map((topic, index) => {
			return (
				<tr key={topic.topic_id}>
					<td>{index + 1}</td>
					<td>{topic.topic_name}</td>
					<td>{topic.description}</td>
					<td>{renderLabelBadge(topic)}</td>
					<td>{topic.approve_desc}</td>
					<td>{renderControlBtn(topic)}</td>
				</tr>
			)
		})
	}

	return (
		<table className="topic-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Tên chủ đề</th>
					<th>Mô tả</th>
					<th>Trạng thái</th>
					<th>Phản hồi</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>{renderTopicList()}</tbody>
		</table>
	)
}

export default TopicTable
