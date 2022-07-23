import { Overlay, Modal } from './Modal.styled';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.turnOffModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.turnOffModal);
  }

  turnOffModal = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <Modal>
          <img src={this.props.fullImg} alt="" />
        </Modal>
      </Overlay>,
      modalRoot
    );
  }
}
