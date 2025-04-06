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
import { CREATE_PLACE_API, CREATE_REVIEW, GET_PLACE_API } from '@/lib/apis/command';
import useToast from '@/hooks/useToast';

const RegisterBottomSheet = (props) => {
  const { closeModal } = useModal();
  const { popToastMessage } = useToast();
  const { name = '', roadAddress = '', jibunAddress = '', lat = 0, lng = 0, placeId = -1, ...otherProps } = props;

  // formData
  const [isSelectOp1, setSelectOp1] = useState(false);
  const [isSelectOp2, setSelectOp2] = useState(false);
  const [isSelectOp3, setSelectOp3] = useState(false);
  const [isSelectOp4, setSelectOp4] = useState(false);
  const [isSelectOp5, setSelectOp5] = useState(false);
  const [isSelectOp6, setSelectOp6] = useState(false);

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async () => {
    if (!rating || !reviewText) {
      return;
    }
    // name, lat, lng, roadAddr, type 를 넘겨야함.
    const data = {
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
    try {
      const resp = await apiClient.request(CREATE_REVIEW, {
        body: data,
      });
      console.log(resp);
      popToastMessage('success', '리뷰를 성공적으로 남겼습니다.');
    } catch (err) {

    }
  };


  return (
    <BottomSheet {...otherProps}>
      <BsHeader
        onClose={() => {
          closeModal('register');
        }}
      ></BsHeader>
      <BsContents>
        <div>
          <p className={css({
            fontWeight: '600',
            fontSize: '20px',
            textDecoration: 'underline',
            textUnderlineOffset: '10px',
            marginBottom: '10px',
          })}>화장실 리뷰는 남기고</p>
          <p className={css({
            fontWeight: '500',
            fontSize: '16px',
          })}>나머지는 비우고 가세요</p>
        </div>

        {/* 리뷰영역*/}
        <div className={css({
          marginTop: '16px',
        })}>
          <HapticWrapper>
            <StarRatingPicker onChange={(rating: number) => {
              setRating(rating);
            }}></StarRatingPicker>
          </HapticWrapper>
        </div>

        {/* 필터옵션 선택*/}
        <div className={css({
          marginTop: '16px',
        })}>
          <p className={css({
            fontWeight: '600',
            fontSize: '15px',
            marginBottom: '10px',
          })}>상태가 어떤가요?</p>
          <div className={css({
            display: 'flex',
            gap: '.6rem',
            flexWrap: 'wrap',
          })}>
            <SelectButton variant={isSelectOp1 ? 'selected' : ''} onClick={() => {
              setSelectOp1(prev => !prev);
            }}>비밀번호 O</SelectButton>
            <SelectButton variant={isSelectOp2 ? 'selected' : ''} onClick={() => {
              setSelectOp2(prev => !prev);
            }}>비밀번호 X</SelectButton>
            <SelectButton variant={isSelectOp3 ? 'selected' : ''} onClick={() => {
              setSelectOp3(prev => !prev);
            }}>휴지 O</SelectButton>
            <SelectButton variant={isSelectOp4 ? 'selected' : ''} onClick={() => {
              setSelectOp4(prev => !prev);
            }}>휴지 X</SelectButton>
            <SelectButton variant={isSelectOp5 ? 'selected' : ''} onClick={() => {
              setSelectOp5(prev => !prev);
            }}>남녀 구분</SelectButton>
            <SelectButton variant={isSelectOp6 ? 'selected' : ''} onClick={() => {
              setSelectOp6(prev => !prev);
            }}>장애인 화장실 O</SelectButton>
          </div>
        </div>

        {/* 리뷰 공간 */}
        <div className={css({ marginTop: '16px' })}>
          <HapticWrapper>
            <ReviewTextArea value={reviewText} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              console.log(e.target.value);
              setReviewText(e.target.value);
            }} />
          </HapticWrapper>
        </div>

      </BsContents>
      <BsFooter>
        <Button variant="wide" mode="haptic" onClick={handleSubmit}>리뷰 등록하기</Button>
      </BsFooter>
    </BottomSheet>
  );
};
export default RegisterBottomSheet;
