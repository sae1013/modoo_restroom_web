'use client';
import React, { ComponentType, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { css } from '@styled-system/css';

const Wrapper = styled(motion.div)<{ maxHeight: number }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  max-height: 90vh;
  //max-height: ${({ maxHeight }) => `${maxHeight}px`}; /* ← 동적 max-height */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  overflow: hidden;
`;

interface BottomSheetProps {
  children: React.ReactNode;
  onCloseCallback?: () => void;
}

// 애니메이션을 자연스럽게 하기위한 조정값
const SMOOTH_BOTTOM_OFFSET = 70;

const BottomSheet = ({ children, onCloseCallback, ...props }: BottomSheetProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState();

  const childrenArray = React.Children.toArray(children);

  const header = childrenArray.find((child) => React.isValidElement(child) && typeof child.type === 'function' && (child.type as any).displayName === 'BsHeader');
  const contents = childrenArray.find((child) => React.isValidElement(child) && typeof child.type === 'function' && (child.type as any).displayName === 'BsContents');
  const footer = childrenArray.find((child) => React.isValidElement(child) && typeof child.type === 'function' && (child.type as any).displayName === 'BsFooter');

  useLayoutEffect(() => {
    // 콘텐츠 컨테이너의 높이를 측정하여 targetHeight에 저장
    const maxHeight = (window?.visualViewport?.height || 10) - 10;

    if (wrapperRef.current) {
      // setWrapperHeight(Math.min(wrapperRef.current.clientHeight, maxHeight));
    }
  }, []);
  const variantOption = {
    // hidden: { y: wrapperHeight },
    // visible: { y: 0 },
    // exit: { y: wrapperHeight + SMOOTH_BOTTOM_OFFSET },
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' },
  };

  // if (wrapperHeight <= 0) {
  //   return (
  //     <div ref={wrapperRef} style={{ visibility: 'hidden' }}>
  //       {children}
  //     </div>
  //   );
  // }
  return (
    <Wrapper
      {...props}
      // maxHeight={wrapperHeight}
      ref={wrapperRef}
      variants={variantOption}
      initial="hidden" // 초기 상태 지정
      animate="visible" // 나타날 때 상태 지정
      exit="exit"
      transition={{ type: 'spring', stiffness: 250, damping: 30 }}
    >
      <div
        className={css({
          flex: 1,
        })}
      >
        {header}
      </div>
      <div
        className={css({
          flex: 9,
          overflow: 'scroll',
        })}
      >
        {contents}
      </div>
      <div
        className={css({
          flex: 1,
        })}
      >
        {footer}
      </div>
    </Wrapper>
  );
};

export default BottomSheet;
