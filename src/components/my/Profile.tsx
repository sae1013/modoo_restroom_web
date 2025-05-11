'use client';

import { css } from '@styled-system/css';
import Horizontal from '@/components/common/Horizontal';
import { useRouter } from 'next/navigation';
import HapticWrapper from '@/components/HapticWrapper';

import { useReviewsByUser } from '@/lib/apis/review';
import useModal from '@/hooks/useModal';
import Reviews from '@/components/my/reviews/Reviews';
import Info from '@/components/my/info/Info';
import { useUserProfile } from '@/lib/apis/user';

const MyProfile = () => {
  const router = useRouter();
  const { data: reviewData, isLoading: isReviewLoading, isError: isReviewError } = useReviewsByUser();
  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useUserProfile();
  const { openModal } = useModal();

  return (
    <div className={css({})}>
      <Info reviewCnt={(reviewData?.result || []).length} user={userData?.result}></Info>
      <Horizontal marginTop={'16px'}></Horizontal>
      <section className={css({})}>
        {/* 헤더영역*/}
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          })}
        >
          <button
            className={css({
              color: '#aaa',
              borderBottom: '2px solid #55BCBD',
              fontWeight: '500',
            })}
          >
            내가 작성한 리뷰
          </button>
        </div>
        {/* 컨텐츠영역*/}
        <Reviews reviews={reviewData?.result}></Reviews>
      </section>
    </div>
  );
};

export default MyProfile;
