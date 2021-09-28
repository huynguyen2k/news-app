require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	res.header('Access-Control-Allow-Headers', 'Content-Type')

	next()
})
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routes = require('./api/routes')
routes(app)

app.listen(port)

console.log('RESTful API server started on: ' + port)
