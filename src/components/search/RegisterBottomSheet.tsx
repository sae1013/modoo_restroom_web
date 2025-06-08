import React, { ChangeEvent, useState } from 'react';

import BottomSheet from '../bottomsheet/BottomSheet';
import BsContents from '../bottomsheet/BsContents';
import BsHeader from '../bottomsheet/BsHeader';
import BsFooter from '../bottomsheet/BsFooter';
import useModal from '@/hooks/useModal';
import SelectButton from '@/components/common/buttons/SelectButton';
import toast from 'react-hot-toast';

import { css } from '@styled-system/css';

import StarRatingPicker from '@/components/common/starRatings/StarRatingPicker';
import Button from '@/components/common/buttons/Button';
import ReviewTextArea from '@/components/common/textAreas/ReviewTextArea';
import HapticWrapper from '@/components/HapticWrapper';
import apiClient from '@/lib/apis/apiClient';
import useToast from '@/hooks/useToast';
import { placeStatusOp } from '@/utils/mapper';
import { useCreateReview } from '@/lib/apis/review';
import AlertPopup from '@/components/popup/AlertPopup';

const RegisterBottomSheet = (props) => {
  const { closeModal } = useModal();
  const { popToastMessage } = useToast();
  const {
    name = '',
    roadAddress = '',
    jibunAddress = '',
    lat = 0,
    lng = 0,
    placeId = -1,
    setPlaces,
    mode = 'existPlace',
    ...otherProps
  } = props;
  // formData
  const [isSelectOp1, setSelectOp1] = useState(false);
  const [isSelectOp2, setSelectOp2] = useState(false);
  const [isSelectOp3, setSelectOp3] = useState(false);
  const [isSelectOp4, setSelectOp4] = useState(false);
  const [isSelectOp5, setSelectOp5] = useState(false);
  const [isSelectOp6, setSelectOp6] = useState(false);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const createReviewMutation = useCreateReview();
  const { openModal } = useModal();
  const handleSubmit = async () => {
    if (!rating || !reviewText) {
      return;
    }

    const body = {
      name,
      roadAddress,
      jibunAddress,
      lat,
      lng,
      placeId,
      option1: isSelectOp1,
      option2: isSelectOp2,
      option3: isSelectOp3,
      option4: isSelectOp4,
      option5: isSelectOp5,
      option6: isSelectOp6,
      rating,
      content: reviewText,
    };
    createReviewMutation.mutate(body, {
      onSuccess: (data, variables, context) => {
        openModal({
          component: AlertPopup,
          props: {
            contents: '성공적으로 등록했어요',
            onCloseCallback: () => {
              if (mode === 'newPlace') {
                setPlaces((prev: any) => [...prev, data.result]);
              }
              closeModal('success_register');
              closeModal('register');
            },
          },
          key: 'success_register',
        });
      },
    });
  };

  return (
    <BottomSheet {...otherProps}>
      <BsHeader
        onClose={() => {
          closeModal();

        }}
      ></BsHeader>
      <BsContents className={css({
        overflow: 'scroll',
      })}>
        <div>
          <p
            className={css({
              fontWeight: '600',
              fontSize: '20px',
              textDecoration: 'underline',
              textUnderlineOffset: '10px',
              marginBottom: '10px',
            })}
          >
            화장실 리뷰는 남기고
          </p>
          <p
            className={css({
              fontWeight: '500',
              fontSize: '16px',
            })}
          >
            나머지는 비우고 가세요
          </p>
        </div>

        {/* 리뷰영역*/}
        <div
          className={css({
            marginTop: '16px',
          })}
        >
          <HapticWrapper>
            <StarRatingPicker
              onChange={(rating: number) => {
                setRating(rating);
              }}
            ></StarRatingPicker>
          </HapticWrapper>
        </div>

        {/* 필터옵션 선택*/}
        <div
          className={css({
            marginTop: '16px',
          })}
        >
          <p
            className={css({
              fontWeight: '600',
              fontSize: '15px',
              marginBottom: '10px',
            })}
          >
            상태가 어떤가요?
          </p>
          <div
            className={css({
              display: 'flex',
              gap: '.6rem',
              flexWrap: 'wrap',
            })}
          >
            <SelectButton
              variant={isSelectOp1 ? 'selected' : ''}
              onClick={() => {
                setSelectOp1((prev) => !prev);
                if (isSelectOp2) {
                  setSelectOp2((prev) => !prev);
                }
              }}
            >
              {placeStatusOp.option1}
            </SelectButton>
            <SelectButton
              variant={isSelectOp2 ? 'selected' : ''}
              onClick={() => {
                setSelectOp2((prev) => !prev);
                if (isSelectOp1) {
                  setSelectOp1((prev) => !prev);
                }
              }}
            >
              {placeStatusOp.option2}
            </SelectButton>
            <SelectButton
              variant={isSelectOp3 ? 'selected' : ''}
              onClick={() => {
                setSelectOp3((prev) => !prev);
                if (isSelectOp4) {
                  setSelectOp4((prev) => !prev);
                }
              }}
            >
              {placeStatusOp.option3}
            </SelectButton>
            <SelectButton
              variant={isSelectOp4 ? 'selected' : ''}
              onClick={() => {
                setSelectOp4((prev) => !prev);
                if (isSelectOp3) {
                  setSelectOp3((prev) => !prev);
                }
              }}
            >
              {placeStatusOp.option4}
            </SelectButton>
            <SelectButton
              variant={isSelectOp5 ? 'selected' : ''}
              onClick={() => {
                setSelectOp5((prev) => !prev);
              }}
            >
              {placeStatusOp.option5}
            </SelectButton>
            <SelectButton
              variant={isSelectOp6 ? 'selected' : ''}
              onClick={() => {
                setSelectOp6((prev) => !prev);
              }}
            >
              {placeStatusOp.option6}
            </SelectButton>
          </div>
        </div>

        {/* 리뷰 공간 */}
        <div className={css({ marginTop: '16px' })}>
          <HapticWrapper>
            <ReviewTextArea
              value={reviewText}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setReviewText(e.target.value);
              }}
            />
          </HapticWrapper>
        </div>
      </BsContents>
      <BsFooter>
        <Button variant="wide" mode="haptic" disabled={!rating || !reviewText} onClick={handleSubmit}>
          {createReviewMutation.isPending ? '소중한 리뷰 작성중...' : '리뷰 등록하기'}
        </Button>
      </BsFooter>
    </BottomSheet>
  );
};
export default RegisterBottomSheet;
