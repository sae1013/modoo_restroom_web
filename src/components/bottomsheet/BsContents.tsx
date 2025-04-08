import { styled } from '../../../styled-system/jsx';

interface BsContentsProps {
  children?: React.ReactNode;
}

const Wrapper = styled('div', {
  base: {
    maxHeight: '637px',
    padding: '1rem 1.5rem',
  },
});

const BsContents = ({ children, ...props }: BsContentsProps) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default BsContents;
