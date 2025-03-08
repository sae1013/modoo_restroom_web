import React from 'react';
import { css } from '@styled-system/css';

function Signup() {
  return (
    <div>
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

      <div
        className={css({
          marginTop: '1rem',
        })}
      >
        <fieldset className="gender-group">
          <legend>성별 선택</legend>
          <label>
            <input>남성</input>
          </label>
          <label>
            <input>여성</input>
          </label>
        </fieldset>
      </div>
    </div>
  );
}

export default Signup;

{
  /* <fieldset class="radio-group">
  <legend>성별 선택</legend>
  <label>
    <input type="radio" name="gender" value="male">
    남성
  </label>
  <label>
    <input type="radio" name="gender" value="female">
    여성
  </label>
</fieldset> */
}
