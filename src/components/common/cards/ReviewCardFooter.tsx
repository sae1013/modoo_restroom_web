import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { SystemProperties } from '@styled-system/types';
import FilterBadge from '@/components/common/badges/FilterBadge';
import StarRating from '@/components/common/starRatings/StarRating';


interface IReviewCardFooterProps extends SystemProperties {
  children?: React.ReactNode;
  tags?: string[];
  date?: string;
  rating?: number;
}

const StyledReviewCardFooter = styled('div', {
  base: {},
});

const ReviewCardFooter = ({ children, tags, date, rating = 4.5, ...props }: IReviewCardFooterProps) => {
  return (
    <StyledReviewCardFooter {...props}>
      <div className={css({
        marginTop: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '10px',
      })}>
        {tags?.map((tag, i) => (
          <FilterBadge key={i + '-' + tag} shape={'round'}>{tag}</FilterBadge>
        ))}
      </div>
      {/* 별 후기 레이팅 표시.*/}
      {/* 날짜 표시*/}
      <div className={css({
        display: 'flex',
        marginTop: '4px',
      })}>
        <StarRating rating={rating} />
        <p className={css({
          color: '#757575',
          fontSize: '14px',
          marginLeft: 'auto',
          paddingRight: '8px',
        })}>{date}</p>
      </div>
    </StyledReviewCardFooter>
  );

};

export default ReviewCardFooter;