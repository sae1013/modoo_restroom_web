'use client';
import { useModalStore } from '@/provider/root-store-provider';

const Modal = () => {
  const { componentStack } = useModalStore((state) => state);

  return (
    <div
      id="root-modal"
      style={{
        position: 'fixed',
        zIndex: 999,
        width: '100wh',
        height: '100vh',
      }}
    >
      {componentStack.map((Component) => {
        <Component></Component>;
      })}
    </div>
  );
};

export default Modal;
