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
};

function Signup() {
  const { openModal, closeModal } = useModal();
  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: defaultFormValue,
  });
  const password = watch('password');
  const _watchPhoneNum = watch('phoneNumber');

  const [isServiceAgree, setIsServiceAgree] = useState(false);
  const [isPrivacyAgree, setIsPrivacyAgree] = useState(false);
  const [isGpsAgree, setIsGpsAgree] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidatingPhoneNumber, setIsValidatingPhoneNumber] = useState(false);

  const [authErrorMsg, setAuthErrorMsg] = useState('');
  // 핸드폰 문자인증
  const handleAuthPhoneNum = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 인증성공시 완료처리
    setIsValidPhoneNumber(true);

    // 인증 에러 메시지
  };

  // 인증번호 인증하기
  const requestAuthNum = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();


    console.log('인증성공');
    setIsValidatingPhoneNumber(true);


  };

  // 이용약관 바텀시트 오픈
  const openTermSheet = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.currentTarget.dataset['item'];
    switch (target) {
      case 'serviceTerm':
        openModal({
          component: ServiceTerm,
          props: {},
          key: 'serviceTerm',
        });
        break;
      case 'privacyTerm':
        openModal({
          component: PrivacyTerm,
          props: {},
          key: 'privacyTerm',
        });
        break;
      case 'GpsTerm':
        openModal({
          component: GpsTerm,
          props: {},
          key: 'gpsTerm',
        });
        break;
      default:
        break;
    }
  };

  // 전체동의
  const handleAgreeAll = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    setIsServiceAgree(true);
    setIsPrivacyAgree(true);
    setIsGpsAgree(true);
  };

  // 부분 동의
  const handleAgreeItem = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget.dataset['item'];
    switch (target) {
      case 'serviceAgreement':
        setIsServiceAgree(prev => !prev);
        break;
      case 'privacyAgreement':
        setIsPrivacyAgree(prev => !prev);
        break;
      case 'GpsAgreement':
        setIsGpsAgree(prev => !prev);
        break;
      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    console.log('submit', data);
  };

  return (
    <form className={css({
      height: '100%',
      overflowY: 'scroll',

    })}
          onSubmit={handleSubmit(onSubmit)}>
      <Section>
        <Input {...register('email', {
          required: '필수 입력값입니다.',
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: '올바른 이메일 형식이 아닙니다.',
          },
        })}
               placeholder="이메일을 입력해주세요" type="email" />
        {errors?.email?.message && <InputError>{errors?.email?.message}</InputError>}
      </Section>

      <Section>
        <Input {...register('password', {
          required: '최소 8자 이상 입력해주세요.',
          minLength: {
            value: 8,
            message: '최소 8자 이상 입력해주세요.',
          },
          pattern: {
            value: /^(?:(?=.*[A-Z])(?=.*[a-z])|(?=.*[A-Z])(?=.*\d)|(?=.*[A-Z])(?=.*[^A-Za-z0-9])|(?=.*[a-z])(?=.*\d)|(?=.*[a-z])(?=.*[^A-Za-z0-9])|(?=.*\d)(?=.*[^A-Za-z0-9])).+$/,
            message: '영어 대문자, 소문자, 숫자, 특수문자 중 최소 2종류 이상을 포함해야 합니다.',
          },
        })} placeholder="비밀번호를 입력해주세요" type="password" />
        {errors?.password?.message && <InputError>{errors?.password?.message}</InputError>}
      </Section>

      <Section>
        <Input placeholder="비밀번호를 다시 입력해주세요" {...register('passwordConfirm', {
          required: '비밀번호 확인은 필수입니다.',
          validate: value => value === password || '비밀번호가 일치하지 않습니다.',
        })} type="password" />
        {errors?.passwordConfirm?.message && <InputError>{errors?.passwordConfirm?.message}</InputError>}
      </Section>

      <Section>
        <Input placeholder="이름을 입력해주세요" {...register('name', {
          required: '이름을 입력해주세요',
        })} type="text" />
        {errors?.name?.message && <InputError>{errors?.name?.message}</InputError>}
      </Section>

      <Section position="relative" backgroundColor={isValidatingPhoneNumber ? '#F2F2F2' : '#fff'}>
        <Input disabled={isValidatingPhoneNumber} placeholder="휴대폰 번호를 입력해주세요"
               type="number" {...register('phoneNumber', {
          required: '숫자만 입력해주세요',
          pattern: {
            value: /^[0-9]+$/,
            message: '숫자만 입력해주세요',
          },
        })} color={isValidatingPhoneNumber ? '#9E9E9E' : '#333'}
        />
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
        )} onClick={requestAuthNum}
                disabled={!!errors?.phoneNumber?.message || isValidatingPhoneNumber || !_watchPhoneNum}>인증번호 요청
        </button>
        {errors?.phoneNumber?.message && <InputError>{errors?.phoneNumber?.message}</InputError>}
      </Section>

      {isValidatingPhoneNumber &&
        <Section position="relative" backgroundColor={isValidPhoneNumber ? '#F2F2F2' : '#fff'}
                 color={isValidPhoneNumber ? '#9E9E9E' : '#333'}>
          <Input placeholder="인증번호를 입력해주세요." type="number" disabled={isValidPhoneNumber}
                 color={isValidPhoneNumber ? '#9E9E9E' : '#333'} />
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
          )} onClick={handleAuthPhoneNum} disabled={isValidPhoneNumber}>인증하기
          </button>
          {authErrorMsg && <InputError>{authErrorMsg}</InputError>}
        </Section>
      }


      {/* 남 여 선택*/}
      <Section>
        <fieldset className={`gender-group ${css({
          display: 'flex',
          justifyContent: 'center',
          gap: '5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #e0e0e0',
        })}`}>

          <label className={css({
            display: 'flex',
            alignItems: 'center',
          })}>
            <MdMale size={30} display="inline-block" fill="#A3D2F2" />
            <span className={css({
              alignSelf: 'flex-start',
              paddingTop: '5px',
              marginRight: '7px',
              color: '#333',
              fontWeight: '500',
              fontSize: '16px',
            })}>남</span>
            <RadioCheckBox value="male" marginTop="10px"
                           alignSelf="flex-start" {...register('gender', { required: '옵션을 선택해주세요.' })} />
          </label>

          <label className={css({
            display: 'flex',
          })}>
            <MdFemale size={30} display="inline-block" fill="#FADADD" />
            <span className={css({
              alignSelf: 'flex-start',
              paddingTop: '5px',
              marginRight: '7px',
              color: '#333',
              fontWeight: '500',
              fontSize: '16px',
            })}>여</span>
            <RadioCheckBox {...register('gender', { required: '옵션을 선택해주세요.' })} value="female" marginTop="10px"
                           alignSelf="flex-start" />
          </label>
        </fieldset>
        {errors?.gender?.message && <InputError>{errors?.gender?.message}</InputError>}
      </Section>

      <Section marginTop="16px">
        <p className={css({
          fontWeight: '500',
          fontSize: '16px',
          color: '#000',
          marginBottom: '16px',

        })}>해우소 서비스 동의</p>
        <div onClick={handleAgreeAll} className={css({
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',

        })}>
          <FaCheck fill="#aaa" />
          <button className={css({
            color: '#6c757d',
            marginLeft: '5px',
            fontWeight: '500',
          })}>전체동의
          </button>
        </div>


        <div className={css({
          paddingBottom: '80px',
        })}>
          <div className={css({
            display: 'flex',
            alignItems: 'center',
            color: '#6c757d',
            fontWeight: '500',
            marginBottom: '8px',
          })}>
            <div onClick={handleAgreeItem} data-item={'serviceAgreement'} className={css({
              padding: '5px',

            })}>
              <IoIosCheckmarkCircleOutline style={{
                transition: 'all .2s',
              }} size="25px" fill={isServiceAgree ? '#55BCBD' : '#adb5bd'}
                                           {...isServiceAgree && { strokeWidth: '5px' }} />
            </div>
            <button className={css({
              marginLeft: '8px',
            })}>[필수] 서비스 이용약관
            </button>
            <button data-item="serviceTerm"
                    className={css({
                      marginLeft: 'auto',
                      marginRight: '10px',
                      textDecoration: 'underline',
                      color: '#aaa',
                    })}
                    onClick={openTermSheet}>보기
            </button>
          </div>

          <div className={css({
            display: 'flex',
            alignItems: 'center',
            color: '#6c757d',
            fontWeight: '500',
            marginBottom: '8px',
          })}>
            <div onClick={handleAgreeItem} data-item={'privacyAgreement'} className={css({
              padding: '5px',
            })}>
              <IoIosCheckmarkCircleOutline style={{
                transition: 'all .2s',
              }} size="25px" fill={isPrivacyAgree ? '#55BCBD' : '#adb5bd'}
                                           {...isPrivacyAgree && { strokeWidth: '5px' }} />
            </div>
            <button className={css({
              marginLeft: '8px',
            })}>[필수] 개인정보 처리방침
            </button>
            <button className={css({
              marginLeft: 'auto',
              marginRight: '10px',
              textDecoration: 'underline',
              color: '#aaa',
            })} data-item="privacyTerm" onClick={openTermSheet}>보기
            </button>
          </div>
          <div className={css({
            display: 'flex',
            alignItems: 'center',
            color: '#6c757d',
            fontWeight: '500',
          })}>
            <div onClick={handleAgreeItem} data-item={'GpsAgreement'} className={css({
              padding: '5px',
            })}>
              <IoIosCheckmarkCircleOutline style={{
                transition: 'all .2s',
              }} size="25px" fill={isGpsAgree ? '#55BCBD' : '#adb5bd'}
                                           {...isGpsAgree && { strokeWidth: '5px' }} />
            </div>
            <button className={css({
              marginLeft: '8px',
            })}>[필수] 위치정보기반 서비스 이용약관
            </button>
            <button data-item="GpsTerm" className={css({
              marginLeft: 'auto',
              marginRight: '10px',
              textDecoration: 'underline',
              color: '#aaa',
            })} onClick={openTermSheet}>보기
            </button>
          </div>
        </div>

      </Section>
      <button className={css({
        position: 'sticky',
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
      })} type={'submit'} disabled={!isServiceAgree || !isPrivacyAgree || !isGpsAgree || !isValidPhoneNumber}>
        가입하기
      </button>
    </form>
  );
};

export default Signup;

