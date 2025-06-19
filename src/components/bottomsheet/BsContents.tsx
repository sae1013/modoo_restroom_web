import { styled } from '../../../styled-system/jsx';

interface BsContentsProps {
  children?: React.ReactNode;
  className?: any;
}

const Wrapper = styled('div', {
  base: {
    padding: '1rem 1.5rem',
    position: 'relative',
    flexGrow: 8,
    overflow: 'auto',
  },
});

const BsContents = ({ children, ...props }: BsContentsProps) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

BsContents.displayName = 'BsContents';
export default BsContents;
