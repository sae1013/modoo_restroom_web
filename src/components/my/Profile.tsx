/**
 * TODO:
 * - 내가 쓴 리뷰 불러오기. (리뷰테이블 뒤진다음, 건물, rating )
 * - 프로필 정보 불러오기.
 * -
 */
'use client';

import { css } from '@styled-system/css';
import Horizontal from '@/components/common/Horizontal';
import Button from '@/components/common/buttons/Button';
import ReviewCardBody from '@/components/common/cards/ReviewCardBody';
import ReviewCardFooter from '@/components/common/cards/ReviewCardFooter';
import { useRouter } from 'next/navigation';
import HapticWrapper from '@/components/HapticWrapper';
import apiClient from '@/lib/apis/apiClient';
import { DELETE_REVIEW } from '@/lib/apis/command';
import Reviews from '@/components/my/reviews/Reviews';

const MyProfile = () => {
  const router = useRouter();

  return (
    <div className={css({})}>
      {/*유저 아이디, 작성리뷰갯수*/}
      <div className={css({
        marginBottom: '16px',
      })}>
        <p className={css({
          fontSize: '20px',
          fontWeight: '600',

        })}>아주빠른 호랑이</p>
        <p className={css({
          color: '#757575',
          fontSize: '14px',
        })}>나의 리뷰: 3곳</p>
      </div>
      {/*<Button onClick={handleEditProfile}>프로필 보기</Button>*/}
      <Horizontal marginTop={'16px'}></Horizontal>

      <section className={css({})}>
        {/* 헤더영역*/}
        <div className={css({
          display: 'flex',
          justifyContent: 'center',
          marginTop: '16px',
        })}>
          <button className={css({
            color: '#aaa',
            borderBottom: '2px solid #55BCBD',
            fontWeight: '500',
          })}>내가 작성한 리뷰
          </button>
        </div>
        <Reviews></Reviews>
      </section>
    </div>
  );
};

export default MyProfile;
