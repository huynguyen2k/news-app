const db = require('../db')

module.exports = {
	insertSubtopic: (req, res) => {
		const data = {
			...req.body,
			approve_status: false,
			approve_pass: false,
			approve_desc: '',
		}
		const query = 'INSERT INTO Subtopics SET ?'
		db.query(query, [data], (err, response) => {
			if (err) throw err
			res.json({
				statusCode: 200,
				message: 'Thêm chủ đề con thành công!',
			})
		})
	},

	approveSubtopic: (req, res) => {
		const { subtopic_id, ...data } = req.body
		const query = 'UPDATE Subtopics SET ? WHERE subtopic_id = ?'
		db.query(query, [data, subtopic_id], (err, response) => {
			if (err) throw err
			if (response.affectedRows > 0) {
				res.json({
					statusCode: 200,
					message: 'Duyệt chủ đề con thành công!',
				})
			} else {
				res.json({
					statusCode: 400,
					message: 'Không tìm thầy chủ đề con mà bạn muốn duyệt!',
				})
			}
		})
	},

	updateSubtopic: (req, res) => {
		let { subtopic_id, ...data } = req.body
		data = {
			...data,
			approve_status: false,
			approve_pass: false,
			approve_desc: '',
		}
		const query = 'UPDATE Subtopics SET ? WHERE subtopic_id = ?'
		db.query(query, [data, subtopic_id], (err, response) => {
			if (err) throw err
			if (response.affectedRows > 0) {
				res.json({
					statusCode: 200,
					message: 'Cập nhật chủ đề con thành công!',
				})
			} else {
				res.json({
					statusCode: 400,
					message: 'Không tìm thầy chủ đề con mà bạn muốn cập nhật!',
				})
			}
		})
	},

	deleteSubtopic: (req, res) => {
		const subtopic_id = req.query.subtopic_id
		const query = 'DELETE FROM Subtopics WHERE subtopic_id = ?'
		db.query(query, [subtopic_id], (err, response) => {
			if (err) throw err
			if (response.affectedRows > 0) {
				res.json({
					statusCode: 200,
					message: 'Xóa chủ đề con thành công!',
				})
			} else {
				res.status(400).send({
					statusCode: 400,
					message: 'Không tìm thầy chủ đề con mà bạn muốn xóa!',
				})
			}
		})
	},

	getSubtopicListByUserId: (req, res) => {
		const userId = req.query.user_id
		const query = `
			SELECT S.*, T.topic_name
			FROM Subtopics S, Topics T
			WHERE S.topic_id = T.topic_id AND S.user_id = ?
		`
		db.query(query, [userId], (err, response) => {
			if (err) throw err
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách thành công!',
				content: response,
			})
		})
	},

	getAcceptedSubtopicList: (req, res) => {
		const query = `
			SELECT * FROM Subtopics
			WHERE approve_status = true AND approve_pass = true
		`
		db.query(query, (err, response) => {
			if (err) throw err
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách chủ đề thành công!',
				content: response,
			})
		})
	},

	getUnapprovedSubtopicList: (req, res) => {
		const query = `
			SELECT S.*, T.topic_name, U.full_name AS author
			FROM Subtopics S, Topics T, Users U
			WHERE S.approve_status = ? 
			AND S.topic_id = T.topic_id 
			AND S.user_id = U.user_id
		`
		db.query(query, [false], (err, response) => {
			if (err) throw err
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách thành công!',
				content: response,
			})
		})
	},
}
