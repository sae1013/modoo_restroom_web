import { css } from '../../../styled-system/css';
import { styled } from '../../../styled-system/jsx';

interface BsContentsProps {
  children?: React.ReactNode;
}

const Wrapper = styled('div', {
  base: {},
});

const BsContents = ({ children }: BsContentsProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BsContents;