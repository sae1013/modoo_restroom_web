import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { SystemProperties } from '@styled-system/types';
import FilterBadge from '@/components/common/badges/FilterBadge';


interface IReviewCardHeader extends SystemProperties {
  children?: React.ReactNode;

}

const StyledReviewCardHeader = styled('div', {
  base: {},
});

const ReviewCardHeader = ({ children, ...props }: IReviewCardHeader) => {
  return (
    <StyledReviewCardHeader {...props}>
      {/* 게시글 헤더 */}
      <div className={css({
        // display: 'flex',
      })}>
        {/*<div>*/}
        {/*  <image src=""></image>*/}
        {/*</div>*/}
        <div>
          <p>Silver ha</p>
          <p className={css({
            color: '#757575',

            fontSize: '13px',
          })}>리뷰 22개</p>
        </div>
      </div>
    </StyledReviewCardHeader>
  );

};

export default ReviewCardHeader;