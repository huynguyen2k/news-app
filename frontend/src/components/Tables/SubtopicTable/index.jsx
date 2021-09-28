import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import BoxIcon from 'assets/images/box-icon.png'
// COMPONENTS
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import LabelBadge from 'components/LabelBadge'

SubtopicTable.propTypes = {
	loading: PropTypes.bool,
	subtopicList: PropTypes.array,
	onSubtopicEdit: PropTypes.func,
	onSubtopicDelete: PropTypes.func,
}

SubtopicTable.defaultProps = {
	loading: false,
	subtopicList: [],
	onSubtopicEdit: () => {},
	onSubtopicDelete: () => {},
}

function renderLabelBadge(subtopic) {
	if (subtopic.approve_status) {
		if (subtopic.approve_pass) {
			return <LabelBadge type="success" text="Chấp thuận" />
		}
		return <LabelBadge type="danger" text="Từ chối" />
	}
	return <LabelBadge type="warning" text="Chờ duyệt" />
}

function SubtopicTable({ subtopicList, onSubtopicEdit, onSubtopicDelete }) {
	function renderControlBtn(subtopic) {
		if (subtopic.approve_status && subtopic.approve_pass) {
			return (
				<div className="subtopic-table__controls">
					<button
						className="btn btn--info disabled"
						onClick={() => onSubtopicEdit(subtopic)}
					>
						<EditIcon />
					</button>
					<button
						className="btn btn--danger disabled"
						onClick={() => onSubtopicDelete(subtopic.subtopic_id)}
					>
						<DeleteIcon />
					</button>
				</div>
			)
		}
		return (
			<div className="subtopic-table__controls">
				<button
					className="btn btn--info"
					onClick={() => onSubtopicEdit(subtopic)}
				>
					<EditIcon />
				</button>
				<button
					className="btn btn--danger"
					onClick={() => onSubtopicDelete(subtopic.subtopic_id)}
				>
					<DeleteIcon />
				</button>
			</div>
		)
	}

	function renderSubtopicList() {
		if (subtopicList.length === 0) {
			return (
				<tr>
					<td colSpan={7}>
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
					<td>{renderLabelBadge(subtopic)}</td>
					<td>{subtopic.approve_desc}</td>
					<td>{renderControlBtn(subtopic)}</td>
				</tr>
			)
		})
	}

	return (
		<table className="subtopic-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Tên chủ đề</th>
					<th>Mô tả</th>
					<th>Thuộc chủ đề</th>
					<th>Trạng thái</th>
					<th>Phản hồi</th>
					<th>Thao tác</th>
				</tr>
			</thead>
			<tbody>{renderSubtopicList()}</tbody>
		</table>
	)
}

export default SubtopicTable
