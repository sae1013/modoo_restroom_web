'use client';

import { css } from '@styled-system/css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('sae1013');
  const [password, setPassword] = useState('');
  const [isPasswordStep, setIsPasswordStep] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // const isPasswordStep = decodeURIComponent(searchParams.get('email') || '');
  useEffect(() => {
    const email = decodeURIComponent(searchParams.get('email') || '');
    console.log('rerender');
    if (email) {
      console.log('here!');
      setIsPasswordStep(true);
    } else {
      setIsPasswordStep(false);
    }
  }, [searchParams.get('email')]);

  const moveToSignup = () => {
    router.push('/auth/signup');
  };

  const handleLogin = async () => {};

  const handleNext = async () => {
    if (!isPasswordStep) {
      const encodedEmail = encodeURIComponent(email);
      router.push(`login?email=${encodedEmail}`);
    } else {
      // 로그인 처리
      await handleLogin();
    }
  };

  return (
    <div
      className={css({
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '2rem',
      })}
    >
      <div
        className={css({
          marginBottom: '3rem',
        })}
      >
        X
      </div>
      <div>
        <p
          className={css({
            fontWeight: 600,
            color: '#222222',
            fontSize: '24px',
            marginBottom: '4rem',
          })}
        >
          해우소 정보를
          <br /> 공유해 볼까요?
        </p>
      </div>
      <div className={css({})}>
        <p
          className={css({
            fontWeight: 500,
            color: '#363636',
            marginBottom: '1.5rem',
          })}
        >
          로그인이 필요한 서비스예요
        </p>

        {!isPasswordStep ? (
          <input
            key="email"
            placeholder={'이메일 주소를 입력해주세요'}
            className={css({
              _placeholder: {
                fontSize: '1.3rem',
              },
              paddingTop: '1rem',
              fontSize: '1.2rem',
              width: '100%',
              borderBottom: '2px solid #55CBCD',
            })}
          ></input>
        ) : (
          <input
            key="password"
            type="password"
            placeholder={'비밀번호를 입력해주세요'}
            className={css({
              _placeholder: {
                fontSize: '1.3rem',
              },
              paddingTop: '1rem',
              fontSize: '1.2rem',
              width: '100%',
              borderBottom: '2px solid #55CBCD',
            })}
          ></input>
        )}
      </div>
      <button
        onClick={() => {
          handleNext();
        }}
        className={css({
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
        })}
      >
        {isPasswordStep ? '로그인' : '다음 >'}
      </button>

      {/* 이메일 주소 입력 하단 영역 */}
      <div>
        <a
          onClick={() => moveToSignup()}
          className={css({
            fontWeight: 700,
            display: 'inline-block',
            fontSize: '.8rem',
            color: '#607d8b',
            marginTop: '2rem',
            paddingLeft: 'auto',
          })}
        >
          계정이 없으신가요?
        </a>
      </div>
    </div>
  );
};

export default Login;
