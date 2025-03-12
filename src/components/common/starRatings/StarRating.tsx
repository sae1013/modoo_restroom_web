import React, { CSSProperties } from 'react';
import { FaStar } from 'react-icons/fa';
import { css } from '@styled-system/css';

// 단일 별 컴포넌트: filledPercentage는 0 ~ 100 사이의 값
const Star = ({ filledPercentage }: { filledPercentage: number }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '1em', height: '1em' }}>
      {/* 비활성 별 (하단 레이어) */}
      <FaStar color="#e0e0e0" size="1em" />
      {/* 활성 별 (상단 레이어): filledPercentage에 따라 가려짐 */}
      <div
        style={{
          width: `${filledPercentage}%`,
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <FaStar color="#ffc107" size="1em" />
      </div>
    </div>
  );
};

const StarRating = ({ rating, max = 5, containerSx = {} }: {
  rating: number,
  max?: number,
  containerSx?: CSSProperties
}) => {
  const stars = [];
  for (let i = 0; i < max; i++) {
    let fill = 0;
    if (rating >= i + 1) {
      fill = 100;
    } else if (rating > i) {
      fill = (rating - i) * 100;
    }
    stars.push(<Star key={i} filledPercentage={fill} />);
  }
  return <div className={css({ ...containerSx })}>{stars}</div>;
};

export default StarRating;