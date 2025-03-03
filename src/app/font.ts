import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/pretendard/Pretendard-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/pretendard/Pretendard-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard', // 전역으로 사용할 CSS 변수명
  display: 'swap', // 로딩 전략
});
