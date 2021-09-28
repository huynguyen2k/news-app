const db = require('../db')

module.exports = {
	insertTopic: (req, res) => {
		const data = {
			...req.body,
			approve_status: false,
			approve_pass: false,
			approve_desc: '',
		}
		const query = 'INSERT INTO Topics SET ?'
		db.query(query, [data], (err, response) => {
			if (err) throw err

			res.json({
				statusCode: 200,
				message: 'Thêm chủ đề thành công!',
			})
		})
	},

	approveTopic: (req, res) => {
		const { topic_id, ...data } = req.body
		const query = 'UPDATE Topics SET ? WHERE topic_id = ?'
		db.query(query, [data, topic_id], (err, response) => {
			if (err) throw err
			if (response.affectedRows > 0) {
				res.json({
					statusCode: 200,
					message: 'Duyệt chủ đề thành công!',
				})
			} else {
				res.status(200).send({
					statusCode: 400,
					message: 'Không tìm thầy chủ đề mà bạn muốn duyệt!',
				})
			}
		})
	},

	updateTopic: (req, res) => {
		let { topic_id, ...data } = req.body
		data = {
			...data,
			approve_status: false,
			approve_pass: false,
			approve_desc: '',
		}
		const query = 'UPDATE Topics SET ? WHERE topic_id = ?'
		db.query(query, [data, topic_id], (err, response) => {
			if (err) throw err
			if (response.affectedRows > 0) {
				res.json({
					statusCode: 200,
					message: 'Cập nhật chủ đề thành công!',
				})
			} else {
				res.status(200).send({
					statusCode: 400,
					message: 'Không tìm thầy chủ đề mà bạn muốn cập nhật!',
				})
			}
		})
	},

	deleteTopic: (req, res) => {
		const topic_id = req.query.topic_id
		const query = 'DELETE FROM Topics WHERE topic_id = ?'
		db.query(query, [topic_id], (err, response) => {
			if (err) throw err
			if (response.affectedRows > 0) {
				res.json({
					statusCode: 200,
					message: 'Xóa chủ đề thành công!',
				})
			} else {
				res.status(400).send({
					statusCode: 400,
					message: 'Không tìm thầy chủ đề mà bạn muốn xóa!',
				})
			}
		})
	},

	getTopicListByUserId: (req, res) => {
		const user_id = req.query.user_id
		const query = 'SELECT * FROM Topics WHERE user_id = ?'
		db.query(query, [user_id], (err, response) => {
			if (err) throw err
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách chủ đề thành công!',
				content: response,
			})
		})
	},

	getAcceptedTopicList: (req, res) => {
		const query =
			'SELECT * FROM Topics WHERE approve_status = ? AND approve_pass = ?'
		db.query(query, [true, true], (err, response) => {
			if (err) throw err
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách chủ đề thành công!',
				content: response,
			})
		})
	},

	getUnapprovedTopicList: (req, res) => {
		const query = `
			SELECT T.*, U.full_name AS author
			FROM Topics T, Users U
			WHERE approve_status = ? AND T.user_id = U.user_id
		`

		db.query(query, [false], (err, response) => {
			if (err) throw err
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách chủ đề thành công!',
				content: response,
			})
		})
	},
}
