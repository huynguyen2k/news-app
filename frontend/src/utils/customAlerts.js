import Swal from 'sweetalert2'

const customAlerts = {
	success: (title, message) => {
		Swal.fire({
			icon: 'success',
			title: title,
			text: message,
			returnFocus: false,
			confirmButtonText: 'Xác nhận',
			confirmButtonColor: '#00ab55',
		})
	},
	error: (title, message) => {
		Swal.fire({
			icon: 'error',
			title: title,
			text: message,
			returnFocus: false,
			confirmButtonText: 'Xác nhận',
			confirmButtonColor: '#00ab55',
		})
	},
	confirm: (title, message) => {
		return Swal.fire({
			icon: 'error',
			title: title,
			text: message,
			returnFocus: false,
			showCancelButton: true,
			confirmButtonColor: '#00ab55',
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Hủy bỏ',
		})
	},
	infoConfirm: (title, message) => {
		return Swal.fire({
			icon: 'info',
			title: title,
			text: message,
			allowOutsideClick: false,
			returnFocus: false,
			showCancelButton: true,
			confirmButtonColor: '#00ab55',
			cancelButtonColor: '#dc3545',
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Không',
		})
	},
}

export default customAlerts
