const db = require('../db')
const fs = require('fs')

module.exports = {
	insertNews: (req, res) => {
		let { subtopics, ...data } = req.body
		if (typeof subtopics === 'string') {
			subtopics = JSON.parse(subtopics)
		}
		data = {
			...data,
			approve_status: false,
			approve_pass: false,
			approve_desc: '',
		}
		data.image =
			process.env.BASE_URL + '/' + req.file.path.split('\\').slice(1).join('/')

		const query = 'INSERT INTO News SET ?'
		db.query(query, [data], (err, response) => {
			if (err) throw err
			const insertId = response.insertId
			const promises = subtopics.map(subtopic_id => {
				return new Promise((resolve, reject) => {
					const query = 'INSERT INTO NewSubtopics SET ?'
					const data = {
						new_id: insertId,
						subtopic_id,
					}
					db.query(query, [data], (err, response) => {
						if (err) throw err
						resolve()
					})
				})
			})

			Promise.all(promises).then(() => {
				res.json({
					statusCode: 200,
					message: 'Thêm bản tin thành công!',
				})
			})
		})
	},

	approveNews: (req, res) => {
		const { new_id, ...data } = req.body
		const query = 'UPDATE News SET ? WHERE new_id = ?'
		db.query(query, [data, new_id], (err, response) => {
			if (err) throw err
			if (response.affectedRows > 0) {
				res.json({
					statusCode: 200,
					message: 'Duyệt bản tin thành công!',
				})
			} else {
				res.json({
					statusCode: 400,
					message: 'Không tìm thầy bản tin mà bạn muốn duyệt!',
				})
			}
		})
	},

	updateNews: (req, res) => {
		let { new_id, subtopics, ...data } = req.body
		data = {
			...data,
			approve_status: false,
			approve_pass: false,
			approve_desc: '',
		}
		if (typeof subtopics === 'string') {
			subtopics = JSON.parse(subtopics)
		}
		const query = 'SELECT * FROM News WHERE new_id = ?'
		db.query(query, [new_id], (err, response) => {
			if (err) throw err

			if (req.file) {
				let image = response[0].image
				image = image.slice(image.lastIndexOf('/') + 1)
				fs.unlinkSync(`./public/images/${image}`)

				data.image =
					process.env.BASE_URL +
					'/' +
					req.file.path.split('\\').slice(1).join('/')
			}

			const query = 'UPDATE News SET ? WHERE new_id = ?'
			db.query(query, [data, new_id], (err, response) => {
				if (err) throw err

				const query = 'DELETE FROM NewSubtopics WHERE new_id = ?'
				db.query(query, [new_id], (err, response) => {
					if (err) throw err

					const promises = subtopics.map(subtopic_id => {
						return new Promise((resolve, reject) => {
							const query = 'INSERT INTO NewSubtopics SET ?'
							const data = {
								new_id: new_id,
								subtopic_id,
							}
							db.query(query, [data], (err, response) => {
								if (err) throw err
								resolve()
							})
						})
					})

					Promise.all(promises).then(() => {
						res.json({
							statusCode: 200,
							message: 'Cập nhật bản tin thành công!',
						})
					})
				})
			})
		})
	},

	deleteNews: (req, res) => {
		const new_id = req.query.new_id
		const query = 'SELECT * FROM News WHERE new_id = ?'
		db.query(query, [new_id], (err, response) => {
			if (err) throw err

			if (response.length > 0) {
				let image = response[0].image
				image = image.slice(image.lastIndexOf('/') + 1)
				fs.unlinkSync(`./public/images/${image}`)
			}

			const query = 'DELETE FROM News WHERE new_id = ?'
			db.query(query, [new_id], (err, response) => {
				if (err) throw err
				if (response.affectedRows > 0) {
					res.json({
						statusCode: 200,
						message: 'Xóa bản tin thành công!',
					})
				} else {
					res.json({
						statusCode: 400,
						message: 'Không tìm thầy bản tin mà bạn muốn xóa!',
					})
				}
			})
		})
	},

	getNewsListByUserId: (req, res) => {
		const userId = req.query.user_id
		const query = `
			SELECT N.*, U.full_name AS author, T.topic_name
			FROM News N, Users U, Topics T
			WHERE N.user_id = ? AND N.user_id = U.user_id AND N.topic_id = T.topic_id
		`
		db.query(query, [userId], async (err, response) => {
			if (err) throw err

			const promises = response.map(news => {
				return new Promise((resolve, reject) => {
					const query = `
					SELECT S.subtopic_id, S.subtopic_name
					FROM NewSubtopics N, Subtopics S
					WHERE N.new_id = ? AND N.subtopic_id = S.subtopic_id
				`
					db.query(query, [news.new_id], (err, subtopics) => {
						if (err) throw err
						news.subtopics = subtopics
						resolve()
					})
				})
			})
			await Promise.all(promises)
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách bản tin thành công!',
				content: response,
			})
		})
	},

	getNewsListByTopicId: (req, res) => {
		const topic_id = req.query.topic_id
		const query = `
			SELECT N.*, U.full_name AS author, T.topic_name
			FROM News N, Users U, Topics T
			WHERE N.topic_id = ? AND N.user_id = U.user_id AND N.topic_id = T.topic_id
			ORDER BY N.created_on DESC
		`
		db.query(query, [topic_id], async (err, response) => {
			if (err) throw err

			const promises = response.map(news => {
				return new Promise((resolve, reject) => {
					const query = `
					SELECT S.subtopic_id, S.subtopic_name
					FROM NewSubtopics N, Subtopics S
					WHERE N.new_id = ? AND N.subtopic_id = S.subtopic_id
				`
					db.query(query, [news.new_id], (err, subtopics) => {
						if (err) throw err
						news.subtopics = subtopics
						resolve()
					})
				})
			})
			await Promise.all(promises)
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách bản tin thành công!',
				content: response,
			})
		})
	},

	getUnapprovedNewsList: (req, res) => {
		const query = `
			SELECT N.*, U.full_name AS author, T.topic_name
			FROM News N, Users U, Topics T
			WHERE N.user_id = U.user_id AND N.topic_id = T.topic_id
			AND N.approve_status = false
		`
		db.query(query, async (err, response) => {
			if (err) throw err

			const promises = response.map(news => {
				return new Promise((resolve, reject) => {
					const query = `
					SELECT S.subtopic_id, S.subtopic_name
					FROM NewSubtopics N, Subtopics S
					WHERE N.new_id = ? AND N.subtopic_id = S.subtopic_id
				`
					db.query(query, [news.new_id], (err, subtopics) => {
						if (err) throw err
						news.subtopics = subtopics
						resolve()
					})
				})
			})
			await Promise.all(promises)
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách bản tin thành công!',
				content: response,
			})
		})
	},

	getAcceptedLatestNews: (req, res) => {
		const query = `
			SELECT N.*, U.full_name AS author, T.topic_name
			FROM News N, Users U, Topics T
			WHERE N.user_id = U.user_id AND N.topic_id = T.topic_id
			AND N.approve_status = true AND N.approve_pass = true
			ORDER BY N.created_on DESC
		`
		db.query(query, async (err, response) => {
			if (err) throw err

			const promises = response.map(news => {
				return new Promise((resolve, reject) => {
					const query = `
					SELECT S.subtopic_id, S.subtopic_name
					FROM NewSubtopics N, Subtopics S
					WHERE N.new_id = ? AND N.subtopic_id = S.subtopic_id
				`
					db.query(query, [news.new_id], (err, subtopics) => {
						if (err) throw err
						news.subtopics = subtopics
						resolve()
					})
				})
			})
			await Promise.all(promises)
			res.json({
				statusCode: 200,
				message: 'Lấy danh sách bản tin thành công!',
				content: response,
			})
		})
	},

	getNewsDetailByNewsId: (req, res) => {
		const newsId = req.query.news_id
		const query = `
			SELECT N.*, U.full_name AS author, T.topic_name
			FROM News N, Users U, Topics T
			WHERE N.user_id = U.user_id AND N.topic_id = T.topic_id
			AND N.approve_status = true AND N.approve_pass = true
			AND N.new_id = ?
		`
		db.query(query, [newsId], async (err, response) => {
			if (err) throw err
			if (!response.length) {
				res.status(404).send({
					statusCode: 404,
					message: 'Không tìm thấy bản tin mà bạn muốn lấy!',
				})
				return
			}

			const news = response[0]
			const query = `
				SELECT S.subtopic_id, S.subtopic_name
				FROM NewSubtopics N, Subtopics S
				WHERE N.new_id = ? AND N.subtopic_id = S.subtopic_id
			`
			db.query(query, [news.new_id], (err, subtopics) => {
				if (err) throw err
				news.subtopics = subtopics

				res.json({
					statusCode: 200,
					message: 'Lấy bản tin thành công!',
					content: news,
				})
			})
		})
	},
}
