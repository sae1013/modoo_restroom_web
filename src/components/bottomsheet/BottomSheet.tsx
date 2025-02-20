import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import BottomSheetHeader from './BsHeader';
import BsFooter from './BsFooter';

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

const ContentWrapper = styled.div`
`;

interface BottomSheetProps {
  children?: React.ReactNode;
  onCloseCallback: () => void;
}

const BottomSheet = ({ children, onCloseCallback }: BottomSheetProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [targetHeight, setTargetHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  useLayoutEffect(() => {
    // 콘텐츠 컨테이너의 높이를 측정하여 targetHeight에 저장
    if (contentRef.current) {
      const contentHeight = contentRef.current.clientHeight;
      setTargetHeight(contentHeight);
    }
  }, []);

  return (
    <AnimatePresence onExitComplete={() => {
      onCloseCallback();
    }}>
      {isOpen &&
        <Wrapper
          ref={wrapperRef}
          animate={{ y: -targetHeight - 48 - 50 }}
          exit={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 30 }}

        >
          <BottomSheetHeader onClose={() => {
            setIsOpen(false);
          }} />
          <ContentWrapper ref={contentRef}>
            <div>
              {children}
            </div>
          </ContentWrapper>
          <BsFooter>
            <button style={{
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
            }}>등록하기
            </button>
          </BsFooter>
        </Wrapper>}

    </AnimatePresence>
  );
};

export default BottomSheet;
