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
import ConfirmPopup from '@/components/popup/ConfirmPopup';
import { IoMdAlert, IoMdSettings } from 'react-icons/io';
import { usePlaceStore } from '@/provider/root-store-provider';
import { useRouter } from 'next/navigation';
import { moveMapToTargetLocation } from '@/utils/naverMapUtils';
import ReviewBottomSheet from '@/components/search/ReviewBottomSheet';

interface ReviewsProps {
  reviews: any;
}

const Reviews = ({ reviews }: ReviewsProps) => {
  const { mutate: deleteReview, isPending } = useDeleteReview();
  const { openModal, closeModal } = useModal();
  const { addPlace, setSelectedPlaceId } = usePlaceStore((state) => state);

  const router = useRouter();
  const handleViewReview = (review: any) => {
    const { place } = review;
    const { lat, lng } = place;

    // 장소를 전역에 추가.
    addPlace(review.place);
    setSelectedPlaceId(place?.id);

    // 메인 페이지로 이동
    setTimeout(() => {
      router.push('/search');
    });

    // 해당 위치로 지도 이동 .
    /**
     * 개선: 메인페이지로 돌아가는경우 현재 내위치로 이동하고 타겟 장소로 이동해서 플리커링같이 이상함이있음.
     */
    setTimeout(() => {
      moveMapToTargetLocation(lat, lng);
    }, 500);

    // 리뷰 팝업 띄우기.
    setTimeout(() => {
      openModal({
        component: ReviewBottomSheet,
        props: {
          placeId: place?.id,
          name: place.name,
          roadAddress: place.roadAddr,
          jibunAddress: place.jibunAddr,
          lat,
          lng,
        },
        key: 'reviewBottomSheet',
      });
    }, 500);
  };

  const handleDeleteReview = async (reviewId: number) => {
    console.log('삭제하기??');

    openModal({
      component: ConfirmPopup,
      key: 'delete_review',
      props: {
        contents: '리뷰를 삭제하시겠어요?',
        confirmLabel: '삭제하기',
        Icon: IoMdAlert,
        confirmCallback: () => {
          closeModal();
          setTimeout(() => {
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
          }, 200);
        },
      },
      key: 'confirm_popup',
    });
  };

  return (
    <>
      {/* 컨텐츠영역*/}
      <ul
        className={css({
          marginTop: '20px',
          '& > li': {
            marginBottom: '16px',
          },
        })}
      >
        {/*컨텐츠 영역*/}
        {reviews?.map((review) => {
          const filterTags = Object.entries(placeStatusOp).reduce((tags, [key, val]) => {
            if (review[key]) {
              tags.push(val);
            }
            return tags;
          }, [] as string[]);

          return (
            <li
              key={review.id}
              className={css({ borderBottom: '2px solid #f2f2f2' })}
              onClick={(event) => {
                event.stopPropagation();
                handleViewReview(review);
              }}
            >
              <div
                className={css({
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                })}
              >
                <p>{review?.place?.name}</p>
                <div
                  className={css({
                    marginLeft: 'auto',
                    color: '#757575',
                    fontSize: '14px',
                  })}
                >
                  {/*<Button*/}
                  {/*  variant="default"*/}
                  {/*  onClick={() => {*/}
                  {/*    handlePopupEditReview(item.placeId, item.id);*/}
                  {/*  }}*/}
                  {/*  className={css({*/}
                  {/*    marginRight: '10px',*/}
                  {/*  })}>편집*/}
                  {/*</Button>*/}

                  <Button
                    variant="default"
                    onClick={() => {
                      handleDeleteReview(review.id);
                    }}
                  >
                    삭제
                  </Button>
                </div>
              </div>
              <ReviewCardBody>{review?.content}</ReviewCardBody>
              <ReviewCardFooter tags={filterTags} date={formatDate(review.createAt)} rating={review.rating} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Reviews;
