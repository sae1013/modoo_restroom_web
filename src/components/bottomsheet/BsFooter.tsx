import { styled } from '../../../styled-system/jsx';

interface BsFooterProps {
  children?: React.ReactNode;
}

const Wrapper = styled('div', {
  base: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    backgroundColor: '#fff',
    padding: '0 1rem',
    paddingBottom: '12px',
  },
});

const BsFooter = ({ children }: BsFooterProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BsFooter;
