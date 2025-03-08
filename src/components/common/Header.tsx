/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/provider/root-store-provider';
import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
// import {}
interface HeaderProps {
  data?: any;
}

const Header = ({ data }: HeaderProps) => {
  return (
    <div
      className={css({
        position: 'fixed',
        width: '100%',
        height: '70px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#55CBCD',
      })}
    >
      {/* < 아이콘  */}
      <div> </div>

      {/* 가운데 텍스트 */}
      {/* // TODO: 경로를 읽어서 동적 이름변경. */}
      <div
        className={css({
          fontWeight: 700,
          color: '#fff',
        })}
      >
        가입하기
      </div>

      {/* 우측영역 */}
    </div>
  );
};
export default Header;
