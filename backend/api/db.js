const mysql = require('mysql')

const db = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASS || '',
	database: process.env.DB_NAME || 'news_db',
	timezone: 'Asia/Ho_Chi_Minh',
})

module.exports = db
