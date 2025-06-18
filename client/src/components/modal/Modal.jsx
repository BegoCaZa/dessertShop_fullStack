import { createPortal } from 'react-dom';
import styles from '../modal/modal.module.css';

const Modal = ({ children }) => {
  if (!children) return;

  return createPortal(
    <div className={styles.modalContainer}>{children}</div>,
    document.getElementById('modal')
  );
};

export default Modal;
