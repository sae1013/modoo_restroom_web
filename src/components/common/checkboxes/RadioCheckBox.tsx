import { css } from '@styled-system/css';
import React, { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { JsxHTMLProps } from '@pandacss/types';
import { SystemProperties } from '@styled-system/types';
import { styled } from '@styled-system/jsx';

interface RadioCheckBoxProps extends JsxHTMLProps<InputHTMLAttributes<HTMLInputElement>>, SystemProperties {

}

const StyledRadioCheckBox = styled('input', {
  base: {
    display: 'inline-block',
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '13px',
    height: '13px',
    border: '1px solid #ccc',
    borderRadius: '50%',
    outline: 'none',
    cursor: 'pointer',
    _checked: {
      backgroundColor: '#55CBCD', // 체크 시 내부 원 색상
      border: '3px solid #fff', // 라인과 원 사이 색상
      boxShadow: '0 0 0 1px #55CBCD', // 라인 색상
    },
  },
});

function RadioCheckBox(props: RadioCheckBoxProps) {
  return (
    <StyledRadioCheckBox type="radio" {...props} />
  );
}

export default RadioCheckBox;
