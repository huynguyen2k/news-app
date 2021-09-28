const db = require('../db')
const fs = require('fs')
const bscript = require('bcrypt')

module.exports = {
	signUp: async (req, res) => {
		const data = req.body
		data.avatar =
			process.env.BASE_URL + '/' + req.file.path.split('\\').slice(1).join('/')
		data.password = await bscript.hash(data.password, 10)

		let query = 'SELECT * FROM users WHERE username = ?'

		db.query(query, [data.username], (err, response) => {
			if (err) throw err
			if (response.length >= 1) {
				res.status(400).send({
					message: 'Tài khoản đã tồn tại!',
					statusCode: '400',
				})
				fs.unlinkSync(req.file.destination + '/' + req.file.filename)
				return
			}

			query = 'INSERT INTO users SET ?'
			db.query(query, [data], (err, response) => {
				if (err) throw err
				res.json({
					message: 'Đăng ký tài khoản thành công!',
					statusCode: 200,
				})
			})
		})
	},

	signIn: (req, res) => {
		const { username, password } = req.body

		const query = `
			SELECT U.*, R.role_name
			FROM Users AS U, Roles AS R 
			WHERE U.username = ? AND U.role_id = R.role_id
		`
		db.query(query, [username], async (err, response) => {
			if (err) throw err
			let isValid = false

			if (response.length === 1) {
				isValid = await bscript.compare(password, response[0].password)
			}

			if (isValid) {
				res.json({
					statusCode: 200,
					message: 'Đăng nhập thành công!',
					content: response[0],
				})
			} else {
				res.status(400).send({
					statusCode: 400,
					message: 'Tài khoản hoặc mật khẩu không hợp lệ!',
				})
			}
		})
	},

	updateUser: (req, res) => {
		let query = 'SELECT * FROM users WHERE user_id = ?'
		const data = req.body

		db.query(query, [data.user_id], (err, response) => {
			if (err) throw err
			if (response.length === 1) {
				if (req.file) {
					let avatarUrl = response[0].avatar
					avatarUrl = avatarUrl.slice(avatarUrl.lastIndexOf('/') + 1)
					fs.unlinkSync(`./public/images/${avatarUrl}`)

					data.avatar =
						process.env.BASE_URL +
						'/' +
						req.file.path.split('\\').slice(1).join('/')
				}

				query = 'UPDATE users SET ? WHERE user_id = ?'
				db.query(query, [data, data.user_id], (err, response) => {
					if (err) throw err

					res.json({
						statusCode: 200,
						message: 'Cập nhật người dùng thành công!',
					})
				})
			} else {
				if (req.file) {
					fs.unlinkSync(req.file.destination + '/' + req.file.filename)
				}
				res.code(400).send({
					statusCode: 400,
					message: 'Không tìm thầy người dùng mà bạn muốn cập nhật!',
				})
			}
		})
	},

	deleteUser: (req, res) => {
		let query = 'SELECT * FROM users WHERE user_id = ?'
		const userId = Number(req.query.userId)

		db.query(query, [userId], (err, response) => {
			if (err) throw err
			if (response.length === 1) {
				let avatarUrl = response[0].avatar
				avatarUrl = avatarUrl.slice(avatarUrl.lastIndexOf('/') + 1)
				fs.unlinkSync(`./public/images/${avatarUrl}`)

				query = 'DELETE FROM users WHERE user_id = ?'
				db.query(query, [userId], (err, response) => {
					if (err) throw err

					res.json({
						statusCode: 200,
						message: 'Xóa người dùng thành công!',
					})
				})
			} else {
				res.json({
					statusCode: 400,
					message: 'Không tìm thầy người dùng mà bạn muốn xóa!',
				})
			}
		})
	},

	getUserList: (req, res) => {
		const query = `
			SELECT U.*, R.role_name
			FROM users AS U, roles AS R 
			WHERE U.role_id = R.role_id
		`

		db.query(query, (err, response) => {
			if (err) throw err
			res.json({
				message: 'Xử lý thành công!',
				statusCode: 200,
				content: response,
			})
		})
	},

	getUserRoleList: (req, res) => {
		const query = 'SELECT * FROM roles'

		db.query(query, (err, response) => {
			if (err) throw err
			res.json({
				message: 'Xử lý thành công!',
				statusCode: 200,
				content: response,
			})
		})
	},
}
