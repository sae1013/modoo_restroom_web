import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { SystemProperties } from '@styled-system/types';
import FilterBadge from '@/components/common/badges/FilterBadge';


interface IReviewCardFooterProps extends SystemProperties {
  children?: React.ReactNode;
  tags?: string[];
  date?: string;
}

const StyledReviewCardFooter = styled('div', {
  base: {},
});

const ReviewCardFooter = ({ children, tags, date, ...props }: IReviewCardFooterProps) => {
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
      {/* 날짜 표시*/}
      <div>
        <p className={css({
          color: '#757575',
          fontSize: '14px',
          textAlign: 'right',
          paddingRight: '8px',
        })}>{date}</p>
      </div>
    </StyledReviewCardFooter>
  );

};

export default ReviewCardFooter;