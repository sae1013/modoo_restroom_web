import { styled } from '@styled-system/jsx';
import { JsxHTMLProps } from '@pandacss/types';
import { ButtonHTMLAttributes } from 'react';
import { SystemProperties } from '@styled-system/types';

interface ButtonProps extends JsxHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>>, SystemProperties {

}

const StyledButton = styled('button', {
  base: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: '50px',
    outline: 'none',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    background: '#55CBCD',
    borderRadius: '10px',
    color: 'white',
    fontWeight: '600',
  },
});

const Button = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};
export default Button;