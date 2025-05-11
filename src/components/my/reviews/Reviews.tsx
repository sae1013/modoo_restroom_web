import { css } from '@styled-system/css';
import Button from '@/components/common/buttons/Button';
import ReviewCardBody from '@/components/common/cards/ReviewCardBody';
import ReviewCardFooter from '@/components/common/cards/ReviewCardFooter';
import apiClient from '@/lib/apis/apiClient';
import { DELETE_REVIEW } from '@/lib/apis/command';
import { useDeleteReview } from '@/lib/apis/review';
import useModal from '@/hooks/useModal';
import AlertPopup from '@/components/popup/AlertPopup';
import { formatDate } from '@/utils/DateUtil';
import React from 'react';
import { placeStatusOp } from '@/utils/mapper';

interface ReviewsProps {
  reviews: any;
}

const Reviews = ({ reviews }: ReviewsProps) => {
  const { mutate: deleteReview, isPending } = useDeleteReview();
  const { openModal } = useModal();

  const handleDeleteReview = async (placeId: number, reviewId: number) => {
    deleteReview(reviewId, {
      onSuccess: () => {
        setTimeout(() => {
          openModal({
            component: AlertPopup,
            props: {
              contents: '삭제되었어요',
            },
            key: 'success_popup',
          });
        }, 400);
      },
    });
  };

  return <>
    {/* 컨텐츠영역*/}
    <ul className={css({
      marginTop: '20px',
      '& > li': {
        marginBottom: '16px',
      },
    })}>
      {/*컨텐츠 영역*/}
      {reviews?.map((review) => {
        const filterTags = Object.entries(placeStatusOp).reduce((tags, [key, val]) => {
          if (review[key]) {
            tags.push(val);
          }
          return tags;
        }, [] as string[]);

        return (
          <li key={review.id}
              className={css({ borderBottom: '2px solid #f2f2f2' })}>
            <div
              className={css({
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',

              })}>
              <p>{review?.place?.name}</p>
              <div
                className={css({
                  marginLeft: 'auto',
                  color: '#757575',
                  fontSize: '14px',
                })}>

                {/*<Button*/}
                {/*  variant="default"*/}
                {/*  onClick={() => {*/}
                {/*    handlePopupEditReview(item.placeId, item.id);*/}
                {/*  }}*/}
                {/*  className={css({*/}
                {/*    marginRight: '10px',*/}
                {/*  })}>편집*/}
                {/*</Button>*/}

                <Button variant="default" onClick={() => {
                  handleDeleteReview(item.placeId, item.id);
                }}>삭제
                </Button>

              </div>
            </div>
            <ReviewCardBody>
              {review?.content}
            </ReviewCardBody>
            <ReviewCardFooter tags={filterTags} date={formatDate(review.createAt)} rating={review.rating} />
          </li>
        );
      })}

    </ul>
  </>;
};

export default Reviews;
