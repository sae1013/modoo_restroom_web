/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/provider/root-store-provider';
import { css } from '@styled-system/css';
import { styled } from '@styled-system/jsx';
import { GrPrevious } from 'react-icons/gr';

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
        justifyContent: 'space-between',
        alignItems: 'center',
      })}
    >
      {/* < 아이콘  */}
      <div className={css({
        paddingLeft: '16px',
        position: 'absolute',
      })}>
        <GrPrevious size={22} />
      </div>

      {/* 가운데 텍스트 */}
      {/* // TODO: 경로를 읽어서 동적 이름변경. */}
      <div
        className={css({
          fontWeight: 600,
          fontSize: '18px',
          textAlign: 'center',
          flex: 1,
        })}
      >
        회원가입
      </div>

      {/* 우측영역 */}
      <div className={css({})}></div>
    </div>
  );
};
export default Header;
