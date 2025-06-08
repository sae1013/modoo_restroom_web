'use client';

import BottomSheet from '../bottomsheet/BottomSheet';
import BsContents from '../bottomsheet/BsContents';
import BsHeader from '../bottomsheet/BsHeader';
import BsFooter from '../bottomsheet/BsFooter';
import useModal from '@/hooks/useModal';
import { css } from '@styled-system/css';
import Button from '@/components/common/buttons/Button';
import StarRating from '@/components/common/starRatings/StarRating';
import Horizontal from '@/components/common/Horizontal';
import ReviewCardBody from '@/components/common/cards/ReviewCardBody';
import ReviewCardFooter from '@/components/common/cards/ReviewCardFooter';
import ReviewCardHeader from '@/components/common/cards/ReviewCardHeader';
import RegisterBottomSheet from '@/components/search/RegisterBottomSheet';
import { placeStatusOp } from '@/utils/mapper';
import React, { useMemo, useState } from 'react';
import FilterButton from '@/components/common/buttons/FilterButton';
import { useReviews } from '@/lib/apis/review';
import { formatDate } from '@/utils/DateUtil';

const ReviewBottomSheet = (props) => {
  const { name = '', roadAddress = '', jibunAddress = '', lat = 0, lng = 0, placeId = -1 } = props;
  const [isSelectOp1, setSelectOp1] = useState(false);
  const [isSelectOp2, setSelectOp2] = useState(false);
  const [isSelectOp3, setSelectOp3] = useState(false);
  const [isSelectOp4, setSelectOp4] = useState(false);
  const [isSelectOp5, setSelectOp5] = useState(false);
  const [isSelectOp6, setSelectOp6] = useState(false);

  const { data, isLoading, isError } = useReviews(placeId);

  const reviews = data?.result?.reviews || [];
  const filteredReviews = useMemo(() => {
    const filterStates: Record<string, boolean> = {
      option1: isSelectOp1,
      option2: isSelectOp2,
      option3: isSelectOp3,
      option4: isSelectOp4,
      option5: isSelectOp5,
      option6: isSelectOp6,
    };
    // 3) 활성화된 필터 키들만 추출
    const activeFilters = Object.entries(filterStates)
      .filter(([, enabled]) => enabled)
      .map(([key]) => key);

    if (activeFilters.length < 1) {
      return reviews;
    }
    return reviews.filter(review => activeFilters.some(key => (review as any)[key]));

  }, [isSelectOp1, isSelectOp2, isSelectOp3, isSelectOp4, isSelectOp5, isSelectOp6, data?.result?.reviews]);
  const { openModal, closeModal } = useModal();
  if (isLoading) {
    return null;
  }
  return (
    <BottomSheet {...props}>
      <BsHeader onClose={() => {
        closeModal();
      }}>

        <div className={css({
          fontWeight: '600',
          fontSize: '18px',
          padding: '4px 16px 0',
        })}>
          <p>{name}</p>
          <StarRating rating={5} containerSx={{ display: 'inline-block' }}></StarRating>
          <span className={css({
            fontSize: '14px',
            display: 'inline-block',
            marginLeft: '5px',
            color: '#757575',
          })}>{`(후기 ${data?.result?.reviewCount || 0}개)`}</span>
          <Horizontal />
        </div>
      </BsHeader>

      <BsContents>
        <div className={css({
          width: '100%',
          overflowX: 'scroll',
        })}>
          <div className={css({
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            width: 'max-content',
            overflowX: 'scroll',
            marginBottom: '10px',
          })}>
            <FilterButton variant={isSelectOp1 ? 'selected' : ''} onClick={() => {
              setSelectOp1(prev => !prev);
              if (isSelectOp2) {
                setSelectOp2(prev => !prev);
              }
            }}>{placeStatusOp.option1}</FilterButton>
            <FilterButton variant={isSelectOp2 ? 'selected' : ''} onClick={() => {
              setSelectOp2(prev => !prev);
              if (isSelectOp1) {
                setSelectOp1(prev => !prev);
              }

            }}>{placeStatusOp.option2}</FilterButton>
            <FilterButton variant={isSelectOp3 ? 'selected' : ''} onClick={() => {
              setSelectOp3(prev => !prev);
              if (isSelectOp4) {
                setSelectOp4(prev => !prev);
              }
            }}>{placeStatusOp.option3}</FilterButton>
            <FilterButton variant={isSelectOp4 ? 'selected' : ''} onClick={() => {
              setSelectOp4(prev => !prev);
              if (isSelectOp3) {
                setSelectOp3(prev => !prev);
              }
            }}>{placeStatusOp.option4}</FilterButton>
            <FilterButton variant={isSelectOp5 ? 'selected' : ''} onClick={() => {
              setSelectOp5(prev => !prev);
            }}>{placeStatusOp.option5}</FilterButton>

            <FilterButton variant={isSelectOp6 ? 'selected' : ''} onClick={() => {
              setSelectOp6(prev => !prev);
            }}>{placeStatusOp.option6}</FilterButton>

          </div>
        </div>

        <Horizontal />

        <div className={css({
            marginTop: '8px',
            maxHeight: '550px',
            paddingBottom: '180px',
            overflowY: 'scroll',
            pointerEvents: 'auto',

            '& > div': {
              marginTop: '14px',
            },
          },
        )} onClick={e => e.stopPropagation()}>
          {filteredReviews.map((review, idx) => {
            const filterTags = Object.entries(placeStatusOp).reduce((tags, [key, val]) => {
              if (review[key]) {
                tags.push(val);
              }
              return tags;
            }, [] as string[]);

            return (
              <div key={review.id} className={css({
                borderBottom: '2px solid #f2f2f2',
              })}>
                <ReviewCardHeader user={review.user} />
                <ReviewCardBody>
                  {review.content}
                </ReviewCardBody>
                <ReviewCardFooter tags={filterTags} date={formatDate(review.createAt)} rating={review.rating} />
              </div>);
          })}

        </div>
      </BsContents>
      <BsFooter>
        <Button variant="wide" mode="haptic" onClick={() => {
          openModal({
            component: RegisterBottomSheet,
            props: props,
            key: 'register',
          });
        }}>리뷰 남기기</Button>
      </BsFooter>
    </BottomSheet>
  );
};

export default ReviewBottomSheet;
