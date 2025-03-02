import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BottomSheetHeader from './BsHeader';
import BsFooter from './BsFooter';
import useModal from '@/hooks/useModal';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

const ContentWrapper = styled.div``;

interface BottomSheetProps {
  children?: React.ReactNode;
  onCloseCallback: () => void;
}

// 애니메이션을 자연스럽게 하기위한 조정값
const SMOOTH_BOTTOM_OFFSET = 30;

const BottomSheet = ({ children, onCloseCallback }: BottomSheetProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const { closeModal } = useModal();

  useLayoutEffect(() => {
    // 콘텐츠 컨테이너의 높이를 측정하여 targetHeight에 저장
    if (wrapperRef.current) {
      setWrapperHeight(wrapperRef.current.clientHeight);
    }
  }, []);

  return (
    <Wrapper
      ref={wrapperRef}
      initial={{ y: window.innerHeight }}
      animate={{ y: window.innerHeight - wrapperHeight }}
      exit={{ y: window.innerHeight + SMOOTH_BOTTOM_OFFSET }}
      transition={{ type: 'spring', stiffness: 250, damping: 30 }}
    >
      <BottomSheetHeader
        onClose={() => {
          closeModal('bottomsheet1');
        }}
      />
      <ContentWrapper ref={contentRef}>
        <div>{children}</div>
      </ContentWrapper>
      <BsFooter>
        <button
          style={{
            position: 'relative',
            bottom: 0,
            width: '100%',
            height: '50px',
            outline: 'none',
            border: 'none',
            fontSize: '1rem',
            background: '#8FCACA',
            cursor: 'pointer',
            // background: '#55CBCD',
            // background: '#A2E1DB',
            borderRadius: '10px',
            color: 'white',
          }}
        >
          등록하기
        </button>
      </BsFooter>
    </Wrapper>
  );
};

export default BottomSheet;
