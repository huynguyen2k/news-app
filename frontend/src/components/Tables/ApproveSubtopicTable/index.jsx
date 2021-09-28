import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BoxIcon from 'assets/images/box-icon.png'
// COMPONENTS
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

ApproveSubtopicTable.propTypes = {
	subtopicList: PropTypes.array,
	onSubtopicAccept: PropTypes.func,
	onSubtopicDeny: PropTypes.func,
}

ApproveSubtopicTable.defaultProps = {
	subtopicList: [],
	onSubtopicAccept: () => {},
	onSubtopicDeny: () => {},
}

function ApproveSubtopicTable({
	subtopicList,
	onSubtopicAccept,
	onSubtopicDeny,
}) {
	function renderSubtopicList() {
		if (subtopicList.length === 0) {
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

		return subtopicList.map((subtopic, index) => {
			return (
				<tr key={subtopic.subtopic_id}>
					<td>{index + 1}</td>
					<td>{subtopic.subtopic_name}</td>
					<td>{subtopic.description}</td>
					<td>{subtopic.topic_name}</td>
					<td>{subtopic.author}</td>
					<td>
						<div className="approve-subtopic-table__controls">
							<button
								type="button"
								className="btn btn--success"
								onClick={() => onSubtopicAccept(subtopic.subtopic_id)}
							>
								<CheckIcon />
							</button>
							<button
								type="button"
								className="btn btn--danger"
								onClick={() => onSubtopicDeny(subtopic.subtopic_id)}
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
		<table className="approve-subtopic-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Tên chủ đề</th>
					<th>Mô tả</th>
					<th>Thuộc chủ đề</th>
					<th>Tác giả</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>{renderSubtopicList()}</tbody>
		</table>
	)
}

export default ApproveSubtopicTable
