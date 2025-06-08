import { styled } from '../../../styled-system/jsx';

interface BsContentsProps {
  children?: React.ReactNode;
  className?: any;
}

const Wrapper = styled('div', {
  base: {
    padding: '1rem 1.5rem',
    position: 'relative',
    paddingBottom: '80px',
    bottom: '20px',
  },
});

const BsContents = ({ children, ...props }: BsContentsProps) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default BsContents;
