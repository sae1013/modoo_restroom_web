'use client';
import { css } from '@styled-system/css';
import { IoMdAlert } from 'react-icons/io';
import useModal from '@/hooks/useModal';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import React from 'react';

const ConfirmPopup = ({ contents, confirmLabel = '확인', confirmCallback, Icon, ...props }: any) => {
  // 애니메이션 상태 정의
  const { closeModal } = useModal();
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      {...props}
      className={css({
        width: '80%',
        backgroundColor: '#fff',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%) !important',
        borderRadius: '20px',
        overflow: 'hidden',
      })}
      variants={popupVariants} // 애니메이션 상태 적용
      initial="hidden" // 초기 상태 지정
      animate="visible" // 나타날 때 상태 지정
      exit="exit" // 사라질 때 상태 지정
    >
      <div
        className={css({
          width: '35px',
          height: '35px',
          marginLeft: 'auto',
          marginRight: '4px',
          marginTop: '10px',
        })}
        onClick={() => {
          closeModal();
        }}
      >
        <IoClose size={25} />
      </div>

      {Icon && (
        <div
          className={css({
            width: '50%',
            margin: '0 auto',
            padding: '30 0',
          })}
        >
          <Icon fill={'#55BCBD'} size="100%" />
        </div>
      )}
      <p
        className={css({
          textAlign: 'center',
          fontWeight: '600',
          fontSize: '18px',
          color: 'neutral.500',
          position: 'relative',
          marginBottom: '40px',
          overflowWrap: 'break-word',
          whiteSpace: 'normal',
          padding: '0 16',
        })}
        dangerouslySetInnerHTML={{ __html: contents }}
      ></p>
      <button
        className={css({
          width: '100%',
          paddingTop: '10px',
          paddingBottom: '10px',
          fontWeight: '500',
          fontSize: '20px',
          backgroundColor: '#55BCBD',
          opacity: '0.9',
          color: '#fff',
        })}
        onClick={() => {
          if (confirmCallback) {
            confirmCallback();
          }
        }}
      >
        {confirmLabel}
      </button>
    </motion.div>
  );
};

export default ConfirmPopup;
