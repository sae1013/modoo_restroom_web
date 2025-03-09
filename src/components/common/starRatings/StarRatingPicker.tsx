import React, { useState } from 'react';
import { IoStarOutline, IoStar } from 'react-icons/io5';
import { css } from '@styled-system/css';

const StarRating =
  ({ maxRating = 5, onChange }:
   { maxRating?: number, onChange: (value: number) => void }) => {

    const [rating, setRating] = useState(0);

    const handleClick = (starValue: number) => {
      setRating(starValue);
      if (onChange) {
        onChange(starValue);
      }
    };

    return (
      <div className={css({
        display: 'flex',
        justifyContent: 'center',
      })}>
        {Array.from({ length: maxRating }, (_, index) => {
          const starNumber = index + 1;
          return (
            <span
              key={starNumber}
              style={{ cursor: 'pointer', marginRight: '4px' }}
              onClick={() => handleClick(starNumber)}
            >
            {starNumber <= rating ? (
              <IoStar color="#ffc107" size={28} />
            ) : (
              <IoStarOutline color="#ffc107" size={28} />
            )}
          </span>
          );
        })}
      </div>
    );
  };

export default StarRating;