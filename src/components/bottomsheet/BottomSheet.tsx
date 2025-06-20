'use client';
import React, { ComponentType, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { css } from '@styled-system/css';

const Wrapper = styled(motion.div)<{ maxHeight: number }>`
    display: flex;
    flex-direction: column;
    position: fixed;
    //left: 0;
    bottom: 0;
    width: 100%;
    max-height: 90vh;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
`;

interface BottomSheetProps {
  children: React.ReactNode;
  onCloseCallback?: () => void;
}

const BottomSheet = ({ children, onCloseCallback, ...props }: BottomSheetProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const childrenArray = React.Children.toArray(children);

  const header = childrenArray.find((child) => React.isValidElement(child) && typeof child.type === 'function' && (child.type as any).displayName === 'BsHeader');
  const contents = childrenArray.find((child) => React.isValidElement(child) && typeof child.type === 'function' && (child.type as any).displayName === 'BsContents');
  const footer = childrenArray.find((child) => React.isValidElement(child) && typeof child.type === 'function' && (child.type as any).displayName === 'BsFooter');

  const variantOption = {
    hidden: { y: '100%' },
    visible: { y: 0 },
    exit: { y: '100%' },
  };

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
      {header}
      {contents}
      {footer}
    </Wrapper>
  );
};

export default BottomSheet;
