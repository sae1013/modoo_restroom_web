import { styled } from '@styled-system/jsx';

import { SystemProperties } from '@styled-system/types';
import { JsxHTMLProps } from '@pandacss/types';
import { InputHTMLAttributes } from 'react';


interface InputProps extends JsxHTMLProps<InputHTMLAttributes<HTMLInputElement>>, SystemProperties {

}

const StyledInput = styled('input', {
  base: {
    width: '100%',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px',
    transition: 'all 0.3s',
    _placeholder: {
      color: '#aaa',
    },
    _focus: {
      outline: 'none',
      borderBottomColor: '#55CBCD',
      borderBottomWidth: '2px',

    },
  },

});

const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};

export default Input;