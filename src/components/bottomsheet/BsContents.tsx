import { styled } from '../../../styled-system/jsx';

interface BsContentsProps {
  children?: React.ReactNode;
}

const Wrapper = styled('div', {
  base: {
    padding: '1rem 1.5rem',
  },
});

const BsContents = ({ children }: BsContentsProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BsContents;
