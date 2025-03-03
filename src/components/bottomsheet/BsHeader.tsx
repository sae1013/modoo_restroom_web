import React from 'react';
import { styled } from '../../../styled-system/jsx';

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
