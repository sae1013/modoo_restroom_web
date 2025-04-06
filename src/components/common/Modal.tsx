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
      {modalStack.map((_, i) => {
        return (
          <div
            key={i}
            style={{
              zIndex: 2 * (i + 1),
            }}
            className={css({
              position: 'fixed',
              width: '100%',
              height: '100vh',

              backgroundColor: 'rgba(0,0,0,0.3)',
            })}
          ></div>
        );
      })}

      <AnimatePresence
        onExitComplete={() => {
          console.log('모달이 닫혔습니다');
        }}
      >
        {modalStack.map((modalOption, i) => {
          const { component, props, key } = modalOption;
          const isFunctionComponent = typeof component === 'function';

          if (!isFunctionComponent) {
            if (React.isValidElement(component)) {
              return React.cloneElement(component, props);
            }
            return null;
          }
          console.log('component', typeof component);
          const Component = component;
          return (
            <Component key={key} {...props} style={{
              zIndex: 2 * (i + 1) + 1,
            }}></Component>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
