import { styled } from '../../../styled-system/jsx';

interface BsFooterProps {
  children?: React.ReactNode;
}

const Wrapper = styled('div', {
  base: {
    position: 'absolute',
    bottom: '10px',
    width: '100%',
    backgroundColor: '#fff',
    padding: '0 1rem',
  },
});

const BsFooter = ({ children }: BsFooterProps) => {
  return <Wrapper>{children}</Wrapper>;
};

BsFooter.displayName = 'BsFooter';
export default BsFooter;
