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
        width: '100wh',
        touchAction: 'none',
        pointerEvents: 'auto',
      }}
    >
      {/*{modalStack.map((item, i) => {*/}
      {/*  return (*/}
      {/*    <div*/}
      {/*      key={item.key}*/}
      {/*      style={{*/}
      {/*        zIndex: 2 * (i + 1),*/}
      {/*      }}*/}
      {/*      className={css({*/}
      {/*        position: 'fixed',*/}
      {/*        width: '100%',*/}
      {/*        height: '100vh',*/}
      {/*        backgroundColor: 'rgba(0,0,0,0.3)',*/}
      {/*        touchAction: 'none',*/}
      {/*        pointerEvents: 'auto',*/}
      {/*      })}*/}
      {/*    ></div>*/}
      {/*  );*/}
      {/*})}*/}

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

          const Component = component;
          return (
            <React.Fragment key={key}>
              <div
                style={{
                  zIndex: 2 * (i + 1),
                }}
                className={css({
                  position: 'fixed',
                  width: '100%',
                  height: '100vh',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  touchAction: 'none',
                  pointerEvents: 'auto',
                })}
              ></div>
              <div style={{
                position: 'fixed',
                zIndex: 2 * (i + 1) + 1,
                // touchAction: 'none',
                // pointerEvents: 'auto',
              }}>
                <Component {...props} ></Component>
              </div>
            </React.Fragment>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Modal;
