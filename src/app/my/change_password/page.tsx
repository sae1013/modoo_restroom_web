'use client';

import React, { MouseEvent, ReactEventHandler, TouchEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { css } from '@styled-system/css';
import RadioCheckBox from '@/components/common/checkboxes/RadioCheckBox';
import Input from '@/components/common/inputs/Input';
import Section from '@/components/common/sections/Section';
import { MdMale } from 'react-icons/md';
import { MdFemale } from 'react-icons/md';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';
import InputError from '@/components/common/inputs/InputError';
import useModal from '@/hooks/useModal';
import ServiceTerm from '@/components/auth/terms/ServiceTerm';
import PrivacyTerm from '@/components/auth/terms/PrivacyTerm';
import GpsTerm from '@/components/auth/terms/GpsTerm';
import apiClient from '@/lib/apis/apiClient';
import { CHANGE_PASSWORD, requestAuthCodeByEmail, SIGNUP_API, verifyAuthCodeByEmail } from '@/lib/apis/command';
import useToast from '@/hooks/useToast';
import { ApiError } from '@/types/common';
import { useRouter } from 'next/navigation';
import AlertPopup from '@/components/popup/AlertPopup';

interface SignupForm {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  gender: string;
}

const defaultFormValue = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phoneNumber: '',
  gender: '',
  verifyCode: '',
};

function Page() {
  const { openModal, closeModal } = useModal();
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValue,
  });
  const password = watch('password');
  const _watchEmail = watch('email');
  const _watchVerifyCode = watch('verifyCode');

  const { popToastMessage } = useToast();
  const router = useRouter();


  const [isValidEmail, setIsValidEmail] = useState(false);

  const [authErrorMsg, setAuthErrorMsg] = useState('');
  // 인증번호 검증하기
  const handleVerifyAuthCode = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await apiClient.request(verifyAuthCodeByEmail, {
        body: {
          email: _watchEmail,
          code: _watchVerifyCode,
        },
      });
      // 인증성공시 완료처리
      setIsValidEmail(true);
      setAuthErrorMsg('');
      popToastMessage('success', '이메일 인증을 성공했어요.');

    } catch (err) {
      setAuthErrorMsg('인증번호를 다시 확인하세요');
    }

  };

  // 인증번호 요청하기
  const handleRequestAuthCode = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await apiClient.request(requestAuthCodeByEmail, {
        body: {
          email: _watchEmail,
        },
      });
      popToastMessage('success', '인증번호가 전송되었어요.');
      // 인증코드 발송 토스트메시지
    } catch (err) {

    }
  };

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    const body = {
      password: data.password,
    };

    try {
      const res = await apiClient.request(CHANGE_PASSWORD, {
        body,
      });
      openModal({
        component: AlertPopup,
        props: {
          contents: '비밀번호가 변경되었습니다.',
          onCloseCallback: () => {
            closeModal();
            router.back();
          },
        },
        key: 'success_popup',
      });
    } catch (err) {
      if (!(err instanceof Error)) return;
      popToastMessage('error', err?.message);
    }
  };

  return (
    <form className={css({
      height: '100%',
      overflowY: 'scroll',
      position: 'relative',

    })}
          onSubmit={handleSubmit(onSubmit)}>
      <Section position={'relative'} backgroundColor={isValidEmail ? '#F2F2F2' : '#fff'}>
        <Input disabled={isValidEmail} {...register('email', {
          required: '필수 입력값입니다.',
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: '올바른 이메일 형식이 아닙니다.',
          },
        })}
               placeholder="이메일을 입력해주세요" type="email" />
        <button className={css({
            position: 'absolute',
            top: '10px',
            right: '8px',
            backgroundColor: '#55CBCD',
            borderRadius: '20px',
            padding: '10px 10px',
            color: '#fff',
            fontWeight: '500',
            fontSize: '15px',
            _disabled: {
              opacity: '40%',
            },
          },
        )} onClick={handleRequestAuthCode} disabled={isValidEmail}>인증요청
        </button>
        {errors?.email?.message && <InputError>{errors?.email?.message}</InputError>}
      </Section>

      <Section position="relative" backgroundColor={isValidEmail ? '#F2F2F2' : '#fff'}
               color={isValidEmail ? '#9E9E9E' : '#333'}>
        <Input placeholder="인증번호를 입력해주세요." type="number" disabled={isValidEmail}
               {...register('verifyCode', {
                 required: '인증코드를 입력하세요',
               })}
               color={isValidEmail ? '#9E9E9E' : '#333'} />
        <button className={css({
            position: 'absolute',
            top: '10px',
            right: '8px',
            backgroundColor: '#55CBCD',
            borderRadius: '20px',
            padding: '10px 10px',
            color: '#fff',
            fontWeight: '500',
            fontSize: '15px',
            _disabled: {
              opacity: '40%',
            },
          },
        )} onClick={handleVerifyAuthCode} disabled={isValidEmail}>인증하기
        </button>
        {/* 인증실패시 팝업띄우기 */}
        {isValidEmail && (
          <div className={css({
            display: 'flex',
            alignItems: 'center',
          })}>
            <FaCheck fill={'#55BCBD'}></FaCheck>
            <p className={css({
              color: '#55BCBD',
              marginLeft: '4px',
            })}>인증이 완료되었습니다</p>
          </div>
        )}
      </Section>

      <Section>
        <Input {...register('password', {
          required: '최소 8자 이상 입력해주세요.',
          minLength: {
            value: 8,
            message: '최소 8자 이상 입력해주세요.',
          },
          pattern: {
            // (?=.*[A-Za-z]) : 영문자 최소 1회
            // (?=.*\d)      : 숫자 최소 1회
            // [A-Za-z\d]{8,} : 영문자·숫자로 구성된 8자 이상
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: '비밀번호는 영문자와 숫자를 포함한 8자 이상이어야 합니다',
          },
        })} placeholder="새 비밀번호를 입력해주세요" type="password" />
        {errors?.password?.message && <InputError>{errors?.password?.message}</InputError>}
      </Section>

      <Section>
        <Input placeholder="비밀번호를 다시 입력해주세요" {...register('passwordConfirm', {
          required: '비밀번호 확인은 필수입니다.',
          validate: value => value === password || '비밀번호가 일치하지 않습니다.',
        })} type="password" />
        {errors?.passwordConfirm?.message && <InputError>{errors?.passwordConfirm?.message}</InputError>}
      </Section>


      <button className={css({
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50px',
        outline: 'none',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        backgroundColor: '#55CBCD',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: 600,
        _disabled: {
          backgroundColor: '#AAE5E6',
        },
      })} type={'submit'} disabled={!isValidEmail}>
        비밀번호 변경
      </button>
    </form>
  );
};

export default Page;

