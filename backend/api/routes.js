const multer = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname)
	},
})

const upload = multer({ storage: storage })

module.exports = function (app) {
	// Users API
	const usersCtrl = require('./controllers/UsersController')
	app.post('/api/users/signUp', upload.single('avatar'), usersCtrl.signUp)
	app.post('/api/users/signIn', usersCtrl.signIn)
	app.put(
		'/api/users/updateUser',
		upload.single('avatar'),
		usersCtrl.updateUser
	)
	app.delete('/api/users/deleteUser', usersCtrl.deleteUser)
	app.get('/api/users/getUserList', usersCtrl.getUserList)
	app.get('/api/users/getUserRoleList', usersCtrl.getUserRoleList)

	// Topics API
	const topicsCtrl = require('./controllers/TopicsController')
	app.post('/api/topics/insertTopic', topicsCtrl.insertTopic)
	app.put('/api/topics/approveTopic', topicsCtrl.approveTopic)
	app.put('/api/topics/updateTopic', topicsCtrl.updateTopic)
	app.delete('/api/topics/deleteTopic', topicsCtrl.deleteTopic)
	app.get('/api/topics/getTopicListByUserId', topicsCtrl.getTopicListByUserId)
	app.get('/api/topics/getAcceptedTopicList', topicsCtrl.getAcceptedTopicList)
	app.get(
		'/api/topics/getUnapprovedTopicList',
		topicsCtrl.getUnapprovedTopicList
	)

	// Subtopics API
	const subtopicsCtrl = require('./controllers/SubtopicsController')
	app.post('/api/subtopics/insertSubtopic', subtopicsCtrl.insertSubtopic)
	app.put('/api/subtopics/approveSubtopic', subtopicsCtrl.approveSubtopic)
	app.put('/api/subtopics/updateSubtopic', subtopicsCtrl.updateSubtopic)
	app.delete('/api/subtopics/deleteSubtopic', subtopicsCtrl.deleteSubtopic)
	app.get(
		'/api/subtopics/getSubtopicListByUserId',
		subtopicsCtrl.getSubtopicListByUserId
	)
	app.get(
		'/api/subtopics/getAcceptedSubtopicList',
		subtopicsCtrl.getAcceptedSubtopicList
	)
	app.get(
		'/api/subtopics/getUnapprovedSubtopicList',
		subtopicsCtrl.getUnapprovedSubtopicList
	)

	// News API
	const newsCtrl = require('./controllers/NewsController')
	app.post('/api/news/insertNews', upload.single('image'), newsCtrl.insertNews)
	app.put('/api/news/approveNews', newsCtrl.approveNews)
	app.put('/api/news/updateNews', upload.single('image'), newsCtrl.updateNews)
	app.delete('/api/news/deleteNews', newsCtrl.deleteNews)
	app.get('/api/news/getNewsListByUserId', newsCtrl.getNewsListByUserId)
	app.get('/api/news/getAcceptedLatestNews', newsCtrl.getAcceptedLatestNews)
	app.get('/api/news/getNewsDetailByNewsId', newsCtrl.getNewsDetailByNewsId)
	app.get('/api/news/getUnapprovedNewsList', newsCtrl.getUnapprovedNewsList)
	app.get('/api/news/getNewsListByTopicId', newsCtrl.getNewsListByTopicId)
}
