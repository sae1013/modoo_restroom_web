import React from 'react';
import { styled } from '../../../styled-system/jsx';

// const Wrapper = styled.div`
//     height: 48px;
//     border-top-left-radius: 8px;
//     border-top-right-radius: 8px;
//     position: relative;
//     padding-top: 100px;
//     padding-bottom: 4px;
// `;
//
// const Handle = styled.div`
//   width: 32px;
//   height: 4px;
//   border-radius: 2px;
//   background-color: #d0d0d0;
//   margin: auto;
// `;
const Wrapper = styled('div', {
  base: {
    height: '48px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    position: 'relative',
    paddingTop: '16px',
    paddingBottom: '4px',
  },
});

const Handle = styled('div', {
  base: {
    width: '32px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: '#d0d0d0',
    margin: 'auto',
  },
});

interface BsHeaderProps {
  onClose: () => void;
}

const BsHeader = ({ onClose }: BsHeaderProps) => {
  return (
    <Wrapper>
      <Handle onClick={onClose} />
    </Wrapper>
  );
};

export default BsHeader;
