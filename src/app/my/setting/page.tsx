'use client';
import { css } from '@styled-system/css';

const Page = () => {
  const handleLogout = () => {

  };

  const handleSignout = () => {

  };

  return (
    <div className={css({
      fontWeight: '500',
    })}>
      <section className={css({

        paddingTop: '16px',
      })}>
        <p className={css({
          fontWeight: '700',
          fontSize: '15px',
          color: 'neutral.800',
          marginBottom: '16px',
        })}>사용자 설정
        </p>
        <ul className={css({
          color: 'neutral.700',
          '& li:not(:last-child)': {
            padding: '16px',
          },
        })}>
          <li className={css({})}>비밀번호 찾기</li>
          <li className={css({})}></li>
        </ul>
      </section>

      <section className={css({
        borderTop: '3px solid',
        borderTopColor: 'neutral.100',
        paddingTop: '16px',
      })}>
        <p className={css({
          fontWeight: '700',
          fontSize: '15px',
          color: 'neutral.800',
          marginBottom: '16px',
        })}>기타
        </p>
        <ul className={css({
          color: 'neutral.700',
          '& li': {
            padding: '16px',
          },
        })}>
          <li className={css({})}>버전 정보</li>
          <li className={css({})} onClick={handleLogout}>로그아웃</li>
          <li className={css({})} onClick={handleSignout}>회원탈퇴</li>
        </ul>
      </section>
    </div>
  );
};
export default Page;
