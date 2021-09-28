import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BoxIcon from 'assets/images/box-icon.png'
// COMPONENTS
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

ApproveTopicTable.propTypes = {
	topicList: PropTypes.array,
	onTopicAccept: PropTypes.func,
	onTopicDeny: PropTypes.func,
}

ApproveTopicTable.defaultProps = {
	topicList: [],
	onTopicAccept: () => {},
	onTopicDeny: () => {},
}

function ApproveTopicTable({ topicList, onTopicAccept, onTopicDeny }) {
	function renderTopicList() {
		if (topicList.length === 0) {
			return (
				<tr>
					<td colSpan={5}>
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
					<td>{topic.author}</td>
					<td>
						<div className="approve-topic-table__controls">
							<button
								type="button"
								className="btn btn--success"
								onClick={() => onTopicAccept(topic.topic_id)}
							>
								<CheckIcon />
							</button>
							<button
								type="button"
								className="btn btn--danger"
								onClick={() => onTopicDeny(topic.topic_id)}
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
		<table className="approve-topic-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Tên chủ đề</th>
					<th>Mô tả</th>
					<th>Tác giả</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>{renderTopicList()}</tbody>
		</table>
	)
}

export default ApproveTopicTable
