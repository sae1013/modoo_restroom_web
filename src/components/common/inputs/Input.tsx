import { styled } from '@styled-system/jsx';

import { SystemProperties } from '@styled-system/types';
import { JsxHTMLProps } from '@pandacss/types';
import React, { InputHTMLAttributes } from 'react';


interface InputProps extends JsxHTMLProps<InputHTMLAttributes<HTMLInputElement>>, SystemProperties {

}

const StyledInput = styled('input', {
  base: {
    width: '100%',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px',
    color: '#333',
    fontWeight: '500',
    paddingLeft: '8px',
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

const Input = React.forwardRef((props: InputProps, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

export default Input;