import { css } from '../../../styled-system/css';
import { styled } from '../../../styled-system/jsx';

interface BsFooterProps {
  children?: React.ReactNode;
}

const Wrapper = styled('div', {
  base: {},
});

const BsFooter = ({ children }: BsFooterProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BsFooter;