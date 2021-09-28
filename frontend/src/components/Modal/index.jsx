import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

Modal.propTypes = {
	openModal: PropTypes.bool,
	onCloseModal: PropTypes.func,
}

Modal.defaultProps = {
	openModal: false,
	onCloseModal: () => {},
}

function Modal({ openModal, onCloseModal, children }) {
	if (!openModal) return null
	return (
		<div className="modal" onClick={onCloseModal}>
			<div className="modal__wrap" onClick={e => e.stopPropagation()}>
				<div className="modal__content">{children}</div>
			</div>
		</div>
	)
}

export default Modal
