import { css } from '../../../styled-system/css';

interface BsContentsProps {
  children?: React.ReactNode;
}

const BsContents = ({ children }: BsContentsProps) => {
  return <div className={css({})}>{children}</div>;
};

export default BsContents;