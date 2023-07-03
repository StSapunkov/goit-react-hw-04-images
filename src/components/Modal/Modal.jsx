import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ onClose, children }) {
  const modalRoot = document.querySelector('#modal-root');

  useEffect(() => {
    window.addEventListener('keydown', closeOnEsc);
    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  });

  const closeOnEsc = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onClickClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={onClickClose}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};