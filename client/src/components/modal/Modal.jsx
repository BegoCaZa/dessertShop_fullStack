import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  if (!children) return;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        backgroundColor: 'rgba(104, 109, 109, 0.226)'
      }}
    >
      {children}
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
