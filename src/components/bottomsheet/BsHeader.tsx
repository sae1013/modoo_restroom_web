import React from 'react';
import { styled } from '../../../styled-system/jsx';
import { IoClose } from 'react-icons/io5';
import { css } from '@styled-system/css';
import HapticWrapper from '@/components/HapticWrapper';

const Wrapper = styled('div', {
  base: {
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    position: 'relative',
    paddingTop: '16px',
    paddingBottom: '4px',
    flexGrow: 1,
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
  children?: React.ReactNode;
  className?: any;
}

const BsHeader = ({ onClose, children, ...props }: BsHeaderProps) => {
  return (
    <Wrapper {...props}>
      {/*<Handle onClick={onClose} />*/}
      <HapticWrapper>
        <div
          className={css({
            width: '35px',
            height: '35px',
            marginLeft: 'auto',
            marginRight: '10px',
          })}
          onClick={onClose}
        >
          <IoClose size={25} />
        </div>
      </HapticWrapper>

      {children}
    </Wrapper>
  );
};

BsHeader.displayName = 'BsHeader';
export default BsHeader;
