'use client';
import { useModalStore } from '@/provider/root-store-provider';
import { AnimatePresence } from 'framer-motion';

const Modal = () => {
  const { modalStack } = useModalStore((state) => state);

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
      <AnimatePresence onExitComplete={() => {
        console.log('모달이 닫혔습니다');
      }}>
        {modalStack.map((modalOption) => {
          const { component: Component, props, key } = modalOption;
          return <Component key={key}{...props}></Component>;
        })}
      </AnimatePresence>
    </div>

  );
};

export default Modal;
