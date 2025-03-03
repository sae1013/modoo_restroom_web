/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { useUserStore } from '@/provider/root-store-provider';
import { css } from '../../styled-system/css';
import { styled } from '../../styled-system/jsx';

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
        backgroundColor: '#fff',
        padding: '.3rem 1rem',
        borderRadius: '30px',
        boxShadow: '0 0 5px rgba(0,0,0,0.4)',
      })}
    >
      <div
        className={css({
          height: '8px',
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
          })}
        ></input>
      </div>
      <div>검색</div>
    </div>
  );
};
export default Header;
