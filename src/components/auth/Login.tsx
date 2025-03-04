'use client';

import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';

const Login = () => {
  return (
    <div className={
      css({
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '2rem',
      })}>
      <div className={
        css({
          marginBottom: '3rem',
        })}>X
      </div>
      <div>
        <p className={
          css({
            fontWeight: 600,
            color: '#222222',
            fontSize: '24px',
            marginBottom: '4rem',
          })}>해우소 정보를<br /> 공유해 볼까요?</p>
      </div>
      <div className={css({})}>
        <p className={
          css({
            fontWeight: 500,
            color: '#363636',
            marginBottom: '1.5rem',
          })}>로그인 혹은 회원가입을 진행해요</p>
        <input placeholder={'이메일 주소를 입력해주세요'} className={
          css({
            _placeholder: {
              fontSize: '1.3rem',
            },
            paddingTop: '1rem',
            fontSize: '1.2rem',
            width: '100%',
            borderBottom: '2px solid #55CBCD',
          })}>

        </input>
      </div>
      <button
        onClick={() => {
          // DB 조회 후, 로그인 유저면 비밀번호 입력으로 넘어가기.
          // 회원가입이 필요하면 회원가입페이지로
        }}
        className={
          css({
            marginTop: '1.5rem',
            border: '2px solid #55CBCD',
            backgroundColor: '#55CBCD',
            opacity: '0.8',
            borderRadius: '5px',
            padding: '.5rem 0',
            width: '100%',
            letterSpacing: '0.0625rem',
            fontWeight: 600,
            color: '#fff',
          })}>다음 &gt;
      </button>
    </div>
  );
};

export default Login;
