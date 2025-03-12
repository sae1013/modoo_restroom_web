import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { SystemProperties } from '@styled-system/types';


interface IReviewCardBodyProps extends SystemProperties {
  children?: React.ReactNode;
}

const StyledReviewCardBody = styled('div', {
  base: {
    marginTop: '8px',
    fontSize: '15px',
    fontWeight: '400',
  },
});

const ReviewCardBody = ({ children, ...props }: IReviewCardBodyProps) => {
  return (
    <StyledReviewCardBody {...props}>
      {children}
    </StyledReviewCardBody>
  );

};

export default ReviewCardBody;