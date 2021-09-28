function getDateTimeFormat(datetime) {
	const days = [
		'Chủ nhật',
		'Thứ hai',
		'Thứ ba',
		'Thứ tư',
		'Thứ năm',
		'Thứ sáu',
		'Thứ bảy',
	]
	const date = new Date(datetime)

	return (
		days[date.getDay()] +
		', ' +
		('0' + date.getDate()).slice(-2) +
		'/' +
		('0' + (date.getMonth() + 1)).slice(-2) +
		'/' +
		date.getFullYear() +
		' ' +
		('0' + date.getHours()).slice(-2) +
		':' +
		('0' + date.getMinutes()).slice(-2) +
		':' +
		('0' + date.getSeconds()).slice(-2)
	)
}

export default getDateTimeFormat
