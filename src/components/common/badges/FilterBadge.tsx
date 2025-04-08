import { SystemProperties } from '@styled-system/types';
import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import NextLink from 'next/link';

interface IFilterBadgeProps extends SystemProperties {
  children?: React.ReactNode;
  shape?: 'round';
}

const StyledBadge = styled('span', {
  base: {
    backgroundColor: '#55CBCD',
    color: '#fff',
    fontWeight: '700',
    padding: '4px 8px',
    fontSize: '11px',
    outline: 'none',
    transition: 'all .2s',
    display: 'inline-block',
    lineHeight: 1.2,
  },
  variants: {
    shape: {
      round: {
        borderRadius: '20px',
      },
    },
  },
});

const FilterBadge = ({ children, ...props }: IFilterBadgeProps) => {
  return (
    <StyledBadge {...props}>
      {children}
    </StyledBadge>
  );
};

export default FilterBadge;