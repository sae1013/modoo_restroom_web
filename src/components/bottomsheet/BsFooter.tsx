import { styled } from '../../../styled-system/jsx';

interface BsFooterProps {
  children?: React.ReactNode;
  className?: any;
}

const Wrapper = styled('div', {
  base: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    padding: '0 1rem',
    paddingBottom: 'calc(var(--safe-area-insets-bottom, 0px) + 10px)',
    flexGrow:1,
  },
});

const BsFooter = ({ children, ...props }: BsFooterProps) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

BsFooter.displayName = 'BsFooter';
export default BsFooter;
