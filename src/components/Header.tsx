/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/provider/root-store-provider';
import { css } from '../../styled-system/css';

interface HeaderProps {
  data: any;
}

const Header = ({ data }: HeaderProps) => {
  const { setUser } = useUserStore((state) => state);

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <div
      className={css({
        position: 'fixed',
        width: '80%',
        left: '50%',
        top: '1rem',
        transform: 'translateX(-50%)',
        zIndex: 99,
        display: 'flex',
        bgColor: '#fff',
        padding: '1rem 2rem',
        borderRadius: '30px',
        boxShadow: '0 0 5px rgba(0,0,0,0.4)',
      })}
    >
      <div
        className={css({
          // bgColor: '#f2f2f2',
          height: '2rem',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 2,
        })}
      >
        <input
          placeholder="주소를 검색해주세요."
          className={css({
            color: '#fff',
            padding: '1rem 2rem',
          })}
        ></input>
      </div>
      <div>검색</div>
    </div>
  );
};
export default Header;
