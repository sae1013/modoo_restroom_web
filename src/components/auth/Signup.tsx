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
        {/* 하단 영역은 이모티콘으로 대체 */}
        <label>성별 (선택사항)</label>
        <option>남자</option>
        <option>여자</option>
      </div>
    </div>
  );
}

export default Signup;
