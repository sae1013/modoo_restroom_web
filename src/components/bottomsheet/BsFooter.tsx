import { styled } from '../../../styled-system/jsx';

interface BsFooterProps {
  children?: React.ReactNode;
}

const Wrapper = styled('div', {
  base: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    padding: '0 1rem',
    paddingBottom: 'calc(var(--safe-area-insets-bottom, 0px) + 10px)',

  },
});

const BsFooter = ({ children }: BsFooterProps) => {
  return <Wrapper>{children}</Wrapper>;
};

BsFooter.displayName = 'BsFooter';
export default BsFooter;
