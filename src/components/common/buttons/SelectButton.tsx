import { styled } from '@styled-system/jsx';
import { JsxHTMLProps } from '@pandacss/types';
import { ButtonHTMLAttributes } from 'react';
import { SystemProperties } from '@styled-system/types';

interface ButtonProps extends JsxHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>>, SystemProperties {

}

const StyledSelectButton = styled('button', {
  base: {
    backgroundColor: '#999',
    color: '#fff',
    fontWeight: '700',
    padding: '.5rem',
    fontSize: '0.8rem',
    borderRadius: '20px',
    outline: 'none',
    transition: 'all .2s',

  },
  variants: {
    variant: {
      selected: {
        backgroundColor: 'black',
      },
    },
  },
});

const SelectButton = (props: ButtonProps) => {
  return <StyledSelectButton {...props} />;
};
export default SelectButton;