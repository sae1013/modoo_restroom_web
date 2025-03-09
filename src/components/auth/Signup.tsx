'use client';

import React from 'react';
import { css } from '@styled-system/css';
import RadioCheckBox from '@/components/common/checkboxes/RadioCheckBox';
import Input from '@/components/common/inputs/Input';
import Section from '@/components/common/sections/Section';
import { MdMale } from 'react-icons/md';
import { MdFemale } from 'react-icons/md';


// TODO: 인풋 공통컴포넌트로 변경, 휴대폰번호 인증로직 추가, 인증번호 클릭시 자동으로 채워지는 기능까지.
// TODO: 약관 페이지 디자인 & 개발.
function Signup() {

  const handleAuthPhoneNum = () => {

  };

  return (
    <div className={css({
      height: '100%',
      position: 'relative',
    })}>
      <Section>
        <Input placeholder="이메일을 입력해주세요" type="email" />
      </Section>

      <Section>
        <Input placeholder="비밀번호를 입력해주세요" type="password" />
      </Section>
      <Section>
        <Input placeholder="비밀번호를 입력해주세요" type="password" />
      </Section>

      <Section>
        <Input placeholder="이름을 입력해주세요" type="text" />
      </Section>

      <Section position="relative">
        <Input placeholder="휴대폰 번호를 입력해주세요" type="number" />
        <button className={css({
            position: 'absolute',
            right: 0,
            bottom: '5px',
            backgroundColor: '#55CBCD',
            borderRadius: '5px',
            padding: '10px 10px',
            color: '#fff',
            fontWeight: '500',
            fontSize: '15px',
          },
        )} onClick={handleAuthPhoneNum}>인증하기
        </button>
      </Section>

      {/* 남 여 선택*/}
      <Section>
        <fieldset className={`gender-group ${css({
          display: 'flex',
          justifyContent: 'center',
          gap: '5rem',
          paddingBottom: '1rem',
          borderBottom: '1.5px solid #e0e0e0',
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
            <RadioCheckBox name="gender" value="male" marginTop="10px" alignSelf="flex-start" />
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
            <RadioCheckBox name="gender" value="female" marginTop="10px" alignSelf="flex-start" />
          </label>
        </fieldset>
      </Section>

      <Section>개인정보</Section>
      <button className={css({
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50px',
        outline: 'none',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        background: '#55CBCD',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: 600,
      })}>
        가입하기
      </button>
    </div>
  );
}

export default Signup;

