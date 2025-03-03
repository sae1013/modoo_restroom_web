'use client';
import { useModalStore } from '@/provider/root-store-provider';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { css } from '@styled-system/css';

const Modal = () => {
  const { modalStack } = useModalStore((state) => state);

  return (
    <div
      id="root-modal"
      style={{
        position: 'fixed',
        zIndex: 999,
        height: '100vh',
      }}
    >
      {modalStack.length > 0 && (
        <div
          className={css({
            position: 'fixed',
            width: '100%',
            height: '100vh',
            zIndex: 99,
            backgroundColor: 'rgba(0,0,0,0.3)',
          })}
        ></div>
      )}

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
