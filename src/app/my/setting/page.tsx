'use client';
import { css } from '@styled-system/css';
import apiClient from '@/lib/apis/apiClient';
import { LOGOUT_API, SIGNOUT_API } from '@/lib/apis/command';
import { useRouter } from 'next/navigation';
import HapticWrapper from '@/components/HapticWrapper';
import Cookies from 'js-cookie';
import ConfirmPopup from '@/components/popup/ConfirmPopup';
import useModal from '@/hooks/useModal';
import ServiceTerm from '@/components/auth/terms/ServiceTerm';
import AlertPopup from '@/components/popup/AlertPopup';

const Page = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const handleLogout = async () => {
    try {
      // TODO: 부하 시 REDIS 세션 삭제로 처리할 예정
      // await apiClient.request(LOGOUT_API);
      // 쿠키에서 삭제.
      Cookies.remove('access_token');
    } catch (error) {
      console.log(error);
    }
    router.push('/auth/login');
  };

  const handleSignout = async () => {
    openModal({
      component: ConfirmPopup,
      props: {
        contents: '정말 탈퇴하시겠습니까? <br/> 탈퇴 시 30일간 재가입이 불가능합니다.',
        confirmLabel: '탈퇴하기',
        confirmCallback: () => {
          closeModal();
          setTimeout(async () => {
            try {
              const res = await apiClient.request(SIGNOUT_API);
              openModal({
                component: AlertPopup,
                props: {
                  contents: '그동안 사용해주셔서 감사합니다',
                  onCloseCallback: () => {
                    router.push('/auth/login');
                    closeModal();
                  },
                },
                key: 'success_popup',
              });
            } catch (err) {}
          }, 100);
        },
      },
      key: 'confirmPopup',
    });
  };

  return (
    <div
      className={css({
        fontWeight: '500',
      })}
    >
      <section
        className={css({
          paddingTop: '16px',
        })}
      >
        <p
          className={css({
            fontWeight: '700',
            fontSize: '15px',
            color: 'neutral.800',
            marginBottom: '16px',
          })}
        >
          사용자 설정
        </p>
        <ul
          className={css({
            color: 'neutral.700',
            '& li:not(:last-child)': {
              padding: '16px',
            },
          })}
        >
          <li className={css({})}>
            <button onClick={() => {}}>비밀번호 변경</button>
          </li>

          <li className={css({})}></li>
        </ul>
      </section>

      <section
        className={css({
          borderTop: '3px solid',
          borderTopColor: 'neutral.100',
          paddingTop: '16px',
        })}
      >
        <p
          className={css({
            fontWeight: '700',
            fontSize: '15px',
            color: 'neutral.800',
            marginBottom: '16px',
          })}
        >
          기타
        </p>
        <ul
          className={css({
            color: 'neutral.700',
            '& li': {
              padding: '16px',
            },
          })}
        >
          <li className={css({})}>버전 정보</li>
          <HapticWrapper>
            <li className={css({})} onClick={handleLogout}>
              로그아웃
            </li>
          </HapticWrapper>
          <HapticWrapper>
            <li className={css({})} onClick={handleSignout}>
              회원탈퇴
            </li>
          </HapticWrapper>
        </ul>
      </section>
    </div>
  );
};
export default Page;
