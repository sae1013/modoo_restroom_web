import React from 'react';
import { styled } from '../../../styled-system/jsx';

const Wrapper = styled('div', {
  base: {
    height: 48,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
    paddingTop: 16,
    paddingBottom: 4,
  },
});

const Handle = styled('div', {
  base: {
    width: 32,
    height: 4,
    borderRadius: 2,
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
