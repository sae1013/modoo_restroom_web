'use client';

import { css } from '@styled-system/css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Input from '@/components/common/inputs/Input';
import InputError from '@/components/common/inputs/InputError';
import apiClient from '@/lib/apis/apiClient';
import { SIGNIN_API } from '@/lib/apis/command';
import Cookies from 'js-cookie';
import { triggerHaptic } from '@/utils/nativeBridge';
import useModal from '@/hooks/useModal';
import ConfirmPopup from '@/components/popup/ConfirmPopup';

const Login = () => {
  const [isPasswordStep, setIsPasswordStep] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { register, handleSubmit, watch, formState, getValues } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { openModal, closeModal } = useModal();
  const _watchEmail = watch('email');
  const _watchPassword = watch('password');

  let disableBtn = false;
  if (isPasswordStep) {
    if (!_watchPassword) {
      disableBtn = true;
    }
  } else {
    if (formState?.errors?.email?.message || !_watchEmail) {
      disableBtn = true;
    }
  }

  useEffect(() => {
    const email = decodeURIComponent(searchParams.get('email') || '');
    if (email) {
      setIsPasswordStep(true);
    } else {
      setIsPasswordStep(false);
    }
  }, [searchParams.get('email')]);

  const moveToSignup = () => {
    router.push('/auth/signup');
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await apiClient.request(SIGNIN_API, {
        body: {
          email,
          password,
        },
        withCredentials: true,
      });
      Cookies.set('access_token', res.result, {
        expires: 3, // 만료: 3일
        path: '/', // 모든 경로에서 접근 가능
        secure: process.env.NODE_ENV === 'production', // https 환경에서만 전송
        sameSite: 'lax', // CSRF 보호 레벨
      });
      router.push('/search');
    } catch (err) {
      // err.response?.data?: message, code, statusCode: 401
      openModal({
        component: ConfirmPopup,
        props: {
          contents: err?.response?.data?.message,
          confirmCallback: () => {
            closeModal();
          },
        },
        key: 'confirm',
      });
      return;

      // TODO: 비밀번호 확인 모달
    }
  };

  const handleNext = async () => {
    if (!isPasswordStep) {
      const encodedEmail = encodeURIComponent(_watchEmail);
      router.push(`login?email=${encodedEmail}`);
    } else {
      // 로그인 처리
      const email = decodeURIComponent(searchParams.get('email') || '');
      await handleLogin(email, _watchPassword);
    }
  };

  return (
    <div
      className={css({
        width: '100vw',
        height: '100vh',
        padding: '2rem',
      })}
    >
      <div
        className={css({
          marginTop: 'calc(var(--safe-area-insets-top, 0px) + 3rem)'
        })}
      >
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
          <Input
            {...register('email', {
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
            key="email"
            placeholder={'이메일 주소를 입력해주세요'}
            className={css({
              _placeholder: {
                fontSize: '1.3rem',
              },
              position: 'relative',
              paddingTop: '1rem',
              fontSize: '1.2rem',
              width: '100%',
              borderBottom: '2px solid #55CBCD',
            })}
          ></Input>
        ) : (
          <Input
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
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
          ></Input>
        )}
      </div>
      {formState?.errors?.email?.message && <InputError>{formState?.errors?.email?.message}</InputError>}
      <button
        disabled={disableBtn || false}
        onClick={() => {
          triggerHaptic();
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
          _disabled: {
            opacity: '40%',
          },
        })}
      >
        {isPasswordStep ? '로그인' : '다음 >'}
      </button>

      {/* 이메일 주소 입력 하단 영역 */}
      <div>
        <a
          onClick={() => {
            triggerHaptic();
            moveToSignup();
          }}
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
