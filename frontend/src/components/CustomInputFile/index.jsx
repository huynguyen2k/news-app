import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// ICONS
import ImageIcon from '@material-ui/icons/Image'
// IMAGE URLS
import defaultImg from 'assets/images/default-image.jpg'

CustomInputFile.propTypes = {
	src: PropTypes.string,
	onChange: PropTypes.func,
}

CustomInputFile.defaultProps = {
	src: '',
	onChange: () => {},
}

function CustomInputFile({ src, onChange }) {
	const inputRef = useRef(null)
	const imgRef = useRef(null)

	function handleInputChange(e) {
		const reader = new FileReader()

		reader.onload = function (e) {
			const dataURL = e.target.result
			imgRef.current.src = dataURL
		}

		if (e.target.files.length > 0) {
			const file = e.target.files[0]
			onChange(file)
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className="custom-input-file">
			<input
				className="file"
				type="file"
				style={{ display: 'none' }}
				ref={inputRef}
				onChange={handleInputChange}
			/>
			<img
				ref={imgRef}
				className="img"
				src={src ? src : defaultImg}
				alt="Custom"
			/>
			<button
				type="button"
				className="choose-img-btn"
				onClick={() => inputRef.current.click()}
			>
				<ImageIcon />
				<span>Chọn ảnh</span>
			</button>
		</div>
	)
}

export default CustomInputFile
