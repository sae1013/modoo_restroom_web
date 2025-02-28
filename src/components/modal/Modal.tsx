'use client';
import { createPortal } from 'react-dom';
import { useModalStore } from '@/provider/root-store-provider';
import { css } from '../../../styled-system/css';

const Modal = () => {
  const { hashStack, modalStack } = useModalStore((state) => state);

  return (
    <div
      className={css({
        zIndex: 9999,
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.5)',
      })}
    >
      {modalStack?.map((modalOption) => {
        return modalOption.component;
      })}
    </div>
  );
};

export default Modal;
