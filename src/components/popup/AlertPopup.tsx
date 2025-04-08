'use client';
// import css from 'styled-jsx/css';
import { css } from '@styled-system/css';
import animationData from 'public/animations/register_success.main.json';
import LottieAnimation from '@/components/common/LottieAnimation';

import useModal from '@/hooks/useModal';
import { motion } from 'framer-motion';

const AlertPopup = (props: any) => {
  const { closeModal } = useModal();
  // 애니메이션 상태 정의
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div {...props}
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
                variants={popupVariants}  // 애니메이션 상태 적용
                initial="hidden"          // 초기 상태 지정
                animate="visible"         // 나타날 때 상태 지정
                exit="exit"               // 사라질 때 상태 지정
    >
      <div>
        <LottieAnimation animationData={animationData} />
      </div>
      <p className={css({
        textAlign: 'center',
        fontWeight: '600',
        fontSize: '18px',
        color: 'neutral.700',
        position: 'relative',
        bottom: '50',
      })}> 성공적으로 등록했어요</p>
      <button className={css({
        width: '100%',
        paddingTop: '10px',
        paddingBottom: '10px',
        fontWeight: '500',
        fontSize: '20px',
        backgroundColor: '#55BCBD',
        opacity: '0.9',
        color: '#fff',
      })} onClick={() => {
        closeModal('success_popup');
      }}>확인
      </button>
    </motion.div>
  );
};

export default AlertPopup;