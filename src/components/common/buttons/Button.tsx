'use client';
import { styled } from '@styled-system/jsx';
import { JsxHTMLProps } from '@pandacss/types';
import { ButtonHTMLAttributes } from 'react';
import { SystemProperties } from '@styled-system/types';
import { triggerHaptic } from '@/utils/nativeBridge';

interface ButtonProps extends JsxHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>>, SystemProperties {
  mode?: 'haptic';
  onClick: () => void;
  variant?: 'wide' | 'default';
}

const StyledButton = styled('button', {
  variants: {
    variant: {
      default: {
        // default variant: 스타일이 전혀 적용되지 않음.
        // (만약 HTML 버튼 기본 스타일을 조금 변경하고 싶다면 여기서 일부 속성을 정의할 수 있습니다.)
      },
      wide: {
        // position: 'absolute',
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
        _disabled: {
          opacity: 0.5, // 80%
          cursor: 'not-allowed', // 클릭 막힌 커서
        },
      },
    },
  },
  // 기본 variant는 custom으로 지정합니다.
  defaultVariants: {
    variant: 'wide',
  },
});

const Button = ({ mode, onClick, ...props }: ButtonProps) => {
  return (
    <StyledButton
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        if (mode === 'haptic') {
          triggerHaptic();
        }
        onClick();
      }}
    >
      {props.children}
    </StyledButton>
  );
};
export default Button;
