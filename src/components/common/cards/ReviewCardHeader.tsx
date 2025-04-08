import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { SystemProperties } from '@styled-system/types';
import FilterBadge from '@/components/common/badges/FilterBadge';


interface IReviewCardHeader extends SystemProperties {
  children?: React.ReactNode;
  user: {
    id: number;
    email: string;
    name: string;
    nickname: string;
    reviewCount: number
  };
}

const StyledReviewCardHeader = styled('div', {
  base: {},
});

const ReviewCardHeader = ({ children, user, ...props }: IReviewCardHeader) => {
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
          <p>{user.nickname}</p>
          <p className={css({
            color: '#757575',

            fontSize: '13px',
          })}>{`리뷰 ${user.reviewCount}개`}</p>
        </div>
      </div>
    </StyledReviewCardHeader>
  );

};

export default ReviewCardHeader;