/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { css } from '@styled-system/css';
import { useRouter } from 'next/navigation';
import { GrPrevious } from 'react-icons/gr';
import { usePathname } from 'next/navigation';
import { IoMdSettings } from 'react-icons/io';

interface HeaderProps {
  data?: any;
}

const Header = ({ data }: HeaderProps) => {

  const router = useRouter();
  const pathname = usePathname();

  // 경로에 따른 displayName 설정
  let displayName = '';
  switch (pathname) {
    case '/auth/login':
      displayName = '로그인';
      break;

    case '/auth/signup':
      displayName = '회원가입';
      break;

    case '/my/like' :
      displayName = '찜한 장소';
      break;

    case '/my/review':
      displayName = '내가 쓴 리뷰';
      break;
    case '/my/profile' :
      displayName = '내 정보';
      break;
    case '/my/profile/my':
      displayName = '프로필 보기';
      break;
    case '/my/setting':
      displayName = '설정';
      break;

    default:
      break;
  }
  const goPrev = () => {
    router.back();
  };

  const goSetting = () => {
    router.push('/my/setting');
  };
  return (
    <div
      className={css({
        position: 'fixed',
        width: '100%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
      })}
    >
      {/* < 아이콘  */}
      <div onClick={() => {
        goPrev();
      }}>
        <GrPrevious size={22} />
      </div>

      {/* 가운데 텍스트 */}
      <p
        className={css({
          fontWeight: 600,
          fontSize: '18px',
          textAlign: 'center',
          flex: 1,
        })}
      >
        {displayName}
      </p>

      {/* 우측영역 */}
      {pathname === '/my/profile' &&
        (<div onClick={goSetting}>
          <IoMdSettings size={25} fill={'#737373'} />
        </div>)
      }

    </div>
  );
};
export default Header;
