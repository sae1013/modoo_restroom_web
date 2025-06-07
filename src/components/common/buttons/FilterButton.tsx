import { styled } from '@styled-system/jsx';
import { JsxHTMLProps } from '@pandacss/types';
import { ButtonHTMLAttributes } from 'react';
import { SystemProperties } from '@styled-system/types';

interface ButtonProps extends JsxHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>>, SystemProperties {
  variant?: string;
}

const StyledFilterButton = styled('button', {
  base: {
    fontWeight: '700',
    padding: '4px 6px',
    fontSize: '13px',
    borderRadius: '20px',
    // backgroundColor: 'gray.100',
    borderWidth: '1px',
    borderColor: 'slate.500',
    borderStyle: 'solid',
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

const FilterButton = (props: ButtonProps) => {

  return <StyledFilterButton {...props} />;
};
export default FilterButton;
