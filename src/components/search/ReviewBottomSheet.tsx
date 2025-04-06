'use client';

import BottomSheet from '../bottomsheet/BottomSheet';
import BsContents from '../bottomsheet/BsContents';
import BsHeader from '../bottomsheet/BsHeader';
import BsFooter from '../bottomsheet/BsFooter';
import useModal from '@/hooks/useModal';
import SelectButton from '@/components/common/buttons/SelectButton';

import { css } from '@styled-system/css';

import StarRatingPicker from '@/components/common/starRatings/StarRatingPicker';
import Button from '@/components/common/buttons/Button';
import ReviewTextArea from '@/components/common/textAreas/ReviewTextArea';
import StarRating from '@/components/common/starRatings/StarRating';
import Horizontal from '@/components/common/Horizontal';
import Link from '@/components/common/links/Link';
import ReviewCardBody from '@/components/common/cards/ReviewCardBody';
import FilterBadge from '@/components/common/badges/FilterBadge';
import ReviewCardFooter from '@/components/common/cards/ReviewCardFooter';
import ReviewCardHeader from '@/components/common/cards/ReviewCardHeader';
import HapticWrapper from '@/components/HapticWrapper';
import RegisterBottomSheet from '@/components/search/RegisterBottomSheet';

const ReviewBottomSheet = (props) => {
  // const { name = '', roadAddress = '', jibunAddress = '', lat = 0, lng = 0, placeId = -1 } = props;

  const { openModal, closeModal } = useModal();
  return (
    <BottomSheet>
      <BsHeader onClose={() => {
        closeModal('reviewBottomSheet');
      }}>

        <div className={css({
          fontWeight: '600',
          fontSize: '18px',
          padding: '16px 16px 0',
        })}>
          <p>서초로 25길 35</p>
          <StarRating rating={5} containerSx={{ display: 'inline-block' }}></StarRating>
          <span className={css({
            fontSize: '14px',
            display: 'inline-block',
            marginLeft: '5px',
            color: '#757575',
          })}>(리뷰 25개)</span>
          <Horizontal />
        </div>
      </BsHeader>

      <BsContents>

        <div className={css({
          height: 'auto',
          width: '100%',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          display: 'flex',
          gap: '10px',
          '&:-webkit-scrollbar': {
            display: 'none',
          },

        })}>
          <Link href={'#'} scroll={false} shape="round">개방</Link>
          <Link href={'#'} scroll={false} shape="round">비밀번호 필요</Link>
          <Link href={'#'} scroll={false} shape="round">휴지있음</Link>
          <Link href={'#'} scroll={false} shape="round">남녀혼용</Link>
          <Link href={'#'} scroll={false} shape="round">장애인 화장실</Link>
          <Link href={'#'} scroll={false} shape="round">추가 </Link>
        </div>
        <Horizontal />

        <div className={css({
            marginTop: '8px',
            maxHeight: '550px',
            overflowY: 'auto',
            '& > div': {
              marginTop: '14px',
            },
          },
        )}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => {
            return (
              <div key={idx} className={css({
                borderBottom: '2px solid #f2f2f2',
              })}>
                <ReviewCardHeader />
                <ReviewCardBody>
                  화장실 비밀번호 5633 여자 3322 입니다. 개좋았어요 휴지없음. 화장실 개추움. 비번자주바뀜.
                </ReviewCardBody>
                <ReviewCardFooter tags={['장애인 화장실', '남녀혼용']} date={'2025.03.21'} />

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