import { styled } from '@styled-system/jsx';
import { JsxHTMLProps } from '@pandacss/types';
import { ButtonHTMLAttributes } from 'react';
import { SystemProperties } from '@styled-system/types';

interface ButtonProps extends JsxHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>>, SystemProperties {
  variant?: string;
}

const StyledSelectButton = styled('button', {
  base: {
    // backgroundColor: '#999',
    // color: '#fff',
    fontWeight: '700',
    padding: '.5rem',
    fontSize: '13px',
    borderRadius: '20px',
    borderWidth: '2px',
    borderColor: 'slate.500',
    borderStyle: 'dotted',
    transition: 'all .2s',

  },
  variants: {
    variant: {
      selected: {
        backgroundColor: 'gray.900',
        color: '#fff',
      },
    },
  },
});

const SelectButton = (props: ButtonProps) => {

  return <StyledSelectButton {...props} />;
};
export default SelectButton;