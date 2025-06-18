import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const Modal = ({ children }) => {
  if (!children) return null;

  return createPortal(
    <div className={styles.modalContainer}>{children}</div>,
    document.getElementById('modal')
  );
};

export default Modal;
