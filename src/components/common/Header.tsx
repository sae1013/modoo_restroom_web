/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { css } from '@styled-system/css';
import { useRouter } from 'next/navigation';
import { GrPrevious } from 'react-icons/gr';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  data?: any;
}

const Header = ({ data }: HeaderProps) => {

  const router = useRouter();
  const pathname = usePathname();
  // 경로에 따른 displayName 설정
  let displayName = '';
  if (pathname === '/auth/login') {
    displayName = '로그인';
  } else if (pathname === '/auth/signup') {
    displayName = '회원가입';
  } else {
    displayName = '기본 제목'; // 그 외 다른 경로일 경우 기본 제목
  }


  const goPrev = () => {
    router.back();
  };

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
      })} onClick={() => {
        goPrev();
      }}>
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
        {displayName}
      </div>

      {/* 우측영역 */}
      <div className={css({})}></div>
    </div>
  );
};
export default Header;
