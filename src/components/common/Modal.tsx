'use client';
import { useModalStore } from '@/provider/root-store-provider';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

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
      <AnimatePresence
        onExitComplete={() => {
          console.log('모달이 닫혔습니다');
        }}
      >
        {modalStack.map((modalOption) => {
          const { component, props, key } = modalOption;
          const isFunctionComponent = typeof component === 'function';

          if (!isFunctionComponent) {
            if (React.isValidElement(component)) {
              return React.cloneElement(component, props);
            }
            return null;
          }

          const Component = component;
          return <Component key={key} {...props}></Component>;
        })}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
