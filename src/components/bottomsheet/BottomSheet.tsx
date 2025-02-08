import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import BottomSheetHeader from './BsHeader';

const Wrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 9999;
    bottom: 0;
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
          // initial={{ bottom: -targetHeight }}
          // animate={{ bottom: 0 }}
          initial={{ height: 0 }}
          animate={{ height: targetHeight + 48 }}
          exit={{ height: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
          <BottomSheetHeader onClose={() => {
            setIsOpen(false);
          }} />
          <ContentWrapper ref={contentRef}>
            <div style={{ height: '500px' }}>
              {children}
            </div>
          </ContentWrapper>
        </Wrapper>}

    </AnimatePresence>
  );
};

export default BottomSheet;
