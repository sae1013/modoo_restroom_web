'use client';
import { useModalStore } from '@/provider/root-store-provider';
import { AnimatePresence } from 'framer-motion';

const Modal = () => {
  const { modalStack } = useModalStore((state) => state);

  return (
    <AnimatePresence onExitComplete={() => {
      console.log('모달이 닫혔습니다');
    }}>
      <div
        id="root-modal"
        style={{
          position: 'fixed',
          zIndex: 999,
          width: '100wh',
          height: '100vh',
        }}
      >
        {modalStack.map((modalOption) => {
          const { component: Component, props } = modalOption;
          return <Component {...props}></Component>;
        })}
      </div>
    </AnimatePresence>
  );
};

export default Modal;
