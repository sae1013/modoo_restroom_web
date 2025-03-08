import React from 'react';
import { css } from '@styled-system/css';
import RadioCheckBox from '@/components/common/RadioCheckBox';

function Signup() {
  return (
    <div className={css({
      height: '100%',
      position: 'relative',
    })}>
      <div>
        <input
          className={css({
            width: '100%',
            borderBottom: '1.5px solid #e0e0e0',
            paddingBottom: '10px',
          })}
          placeholder="이메일을 입력해주세요"
        ></input>
      </div>

      <div
        className={css({
          marginTop: '2rem',
        })}
      >
        <input
          className={css({
            width: '100%',
            borderBottom: '1.5px solid #e0e0e0',
            paddingBottom: '16px',
          })}
          placeholder="비밀번호를 입력해주세요"
        ></input>
      </div>

      <div
        className={css({
          marginTop: '2rem',
        })}
      >
        <input
          className={css({
            width: '100%',
            borderBottom: '1.5px solid #e0e0e0',
            paddingBottom: '16px',
          })}
          placeholder="비밀번호를 다시 입력해주세요"
        ></input>
      </div>

      <div
        className={css({
          marginTop: '2rem',
        })}
      >
        <input
          className={css({
            width: '100%',
            borderBottom: '1.5px solid #e0e0e0',
            paddingBottom: '16px',
          })}
          placeholder="이름을 입력해주세요"
        ></input>
      </div>
      {/* 남 여 선택*/}
      <div
        className={css({
          marginTop: '1rem',
        })}
      >
        <fieldset className={`gender-group ${css({
          display: 'flex',
          justifyContent: 'center',
          gap: '5rem',
          paddingBottom: '1rem',
          borderBottom: '1.5px solid #e0e0e0',
        })}`}>

          <label className={css({})}>
            <span className={css({
              marginRight: '1rem',
            })}>남</span>
            <RadioCheckBox name="gender" value="male" />
          </label>
          <label className={css({})}>
            <span className={css({
              marginRight: '1rem',
            })}>여</span>
            <RadioCheckBox name="gender" value="female" />
          </label>
        </fieldset>
      </div>

      <div className={css({
        marginTop: '1rem',
      })}>개인정보동의
      </div>
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

