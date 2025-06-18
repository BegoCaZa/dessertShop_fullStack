import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
  if (!children) return;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(57, 59, 59, 0.739)'
      }}
    >
      {children}
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
