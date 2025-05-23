import { styled } from '@styled-system/jsx';
import NextLink, { LinkProps } from 'next/link';
import { JsxHTMLProps } from '@pandacss/types';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { SystemProperties } from '@styled-system/types';

const StyledLink = styled(NextLink, {
  base: {
    backgroundColor: 'gray.100',
    color: 'neutral.800',
    fontWeight: '700',
    padding: '.5rem',
    fontSize: '0.8rem',
    outline: 'none',
    transition: 'all .2s',
    display: 'inline-block',
  },
  variants: {
    selected: {
      backgroundColor: '#eee',
      color:'#fff'

    },
    shape: {
      round: {
        borderRadius: '30px',
      },
    },
  },
});

interface ILinkProps extends LinkProps, SystemProperties {
  children?: React.ReactNode;
  shape?: 'round';
  selected?: boolean;

}


const Link = ({ children, ...props }: ILinkProps) => {
  return <StyledLink {...props}>{children}</StyledLink>;
};
export default Link;