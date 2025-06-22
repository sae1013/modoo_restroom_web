'use client';
import { styled } from '@styled-system/jsx';
import { css } from '@styled-system/css';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import HapticWrapper from '@/components/HapticWrapper';

const BottomNav = () => {
  const router = useRouter();

  const movePage = (e: MouseEvent<HTMLLIElement>) => {
    const path = e.currentTarget.dataset.path;
    router.push(path || '');
  };
  return (

    <div className={css({
      zIndex: 99,
      position: 'fixed',
      bottom: 'var(--safe-area-insets-bottom, 0px)',
      backgroundColor: '#fff',
      opacity: 0.9,
      width: '100px',
      height: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '30px',
      boxShadow: '0px 0px 5px rgba(0,0,0,0.4)',
      backdropFilter: 'blur(10px)',
    })}>
      <ul className={css({
        display: 'flex',
        height: '100%',
        gap: '30px',
        alignItems: 'center',
        justifyContent: 'center',
      })}>
        {/*<HapticWrapper>*/}
        {/*  <li data-path="/search" onClick={movePage}>*/}
        {/*    <FaMapMarkedAlt size={24} fill="#55BCBD" />*/}
        {/*  </li>*/}
        {/*</HapticWrapper>*/}
        {/*<HapticWrapper>*/}
        {/*  <li data-path="/my/like" onClick={movePage}>*/}
        {/*    <FaHeart size={24} fill="#55BCBD" />*/}
        {/*  </li>*/}
        {/*</HapticWrapper>*/}
        <HapticWrapper>
          <li data-path="/my/profile" onClick={movePage}><FaUserCircle size={24} fill="#55BCBD" /></li>
        </HapticWrapper>
      </ul>
    </div>
  );
};
export default BottomNav;
