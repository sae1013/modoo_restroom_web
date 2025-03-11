import { styled } from '@styled-system/jsx';
import { JsxHTMLProps } from '@pandacss/types';
import { InputHTMLAttributes } from 'react';
import { SystemProperties } from '@styled-system/types';

const StyledInputError = styled('p', {
  base: {
    color: '#F44336',
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '2px',
  },
});

interface InputError extends JsxHTMLProps<InputHTMLAttributes<HTMLInputElement>>, SystemProperties {

}

const InputError = (props: InputError) => {
  return <StyledInputError {...props} />;
};

export default InputError;