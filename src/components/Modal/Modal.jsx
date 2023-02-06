import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImg, tags } = this.props;
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackDropClick}>
        <div className={css.Modal}>
          <img src={largeImg} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImage: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
