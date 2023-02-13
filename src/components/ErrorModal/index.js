import React from 'react'
import { Modal, ModalBody } from "react-bootstrap";

const ErrorModal = ({message, showErrorModal, closeModal}) => {
  return (
    <Modal show={showErrorModal} onHide={closeModal}>
        <Modal.Header closeButton className="style-modal-header">
            <Modal.Title >Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
    </Modal>
            
  )
}

export default ErrorModal;