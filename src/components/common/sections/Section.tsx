import { styled } from '@styled-system/jsx';
import { JsxHTMLProps } from '@pandacss/types';
import { InputHTMLAttributes } from 'react';
import { SystemProperties } from '@styled-system/types';

interface SectionProps extends JsxHTMLProps<InputHTMLAttributes<HTMLDivElement>>, SystemProperties {

}

const StyledSection = styled('section', {
  base: {
    paddingTop: '24px',

  },
});

const Section = (props: SectionProps) => {
  return <StyledSection {...props} />;
};

export default Section;