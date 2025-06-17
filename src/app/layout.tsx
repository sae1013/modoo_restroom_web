import type { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';
import StyledJsxRegistry from '@/app/registry';
import axios from 'axios';
import { redirect } from 'next/navigation';

import './globals.css';
import { pretendard } from '@/app/font';

import HeaderLayout from '@/components/common/HeaderLayout';
import { RootStoreProvider } from '@/provider/root-store-provider';
import Modal from '@/components/common/Modal';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import ReactQueryProviders from '@/provider/queryProvider';
import AnimationPageRoute from '@/components/AnimationPageRoute';

export const metadata: Metadata = {
  title: '해우소',
  description: '내 근처 상가, 공용 화장실 정보를 공유해주세요.',
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {

  const initUser = {
    user: {
      email: 'zxcasd',
    },
  };
  // 어차피 여기서 쿠기값을 읽을거니까... 여기서는 유저정보를 받아서 스토어에 초기화하는용도.

  // const initUser = null;

  return (
    <html lang="ko" className={pretendard.className}>
    <head>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              :root {
                --safe-area-insets-top: 0;
                --safe-area-insets-bottom: 0;
              }
            `,
        }}
      />
    </head>
    <body>
    <StyledJsxRegistry>
      <ReactQueryProviders>
        <RootStoreProvider userData={initUser}>
          <Modal></Modal>
          <HeaderLayout></HeaderLayout>
          <Toaster></Toaster>
          <AnimationPageRoute>
            {children}
          </AnimationPageRoute>
        </RootStoreProvider>
      </ReactQueryProviders>
    </StyledJsxRegistry>

    <Script strategy="afterInteractive">
      {`
        (function() {
        const SAFE_AREA_INSETS_TOP = window.SAFE_AREA_INSETS_TOP;
        const SAFE_AREA_INSETS_BOTTOM = window.SAFE_AREA_INSETS_BOTTOM;
        document.documentElement.style.setProperty('--safe-area-insets-top' , SAFE_AREA_INSETS_TOP+'px');
        document.documentElement.style.setProperty('--safe-area-insets-bottom' , SAFE_AREA_INSETS_BOTTOM+'px');
      })()
      console.log(
      '[CSS var bottom]',
      getComputedStyle(document.documentElement)
        .getPropertyValue('--safe-area-insets-bottom')
    );
    console.log(
      '[CSS var top]',
      getComputedStyle(document.documentElement)
        .getPropertyValue('--safe-area-insets-top')
    );
      `

      }
    </Script>

    <Script
      src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_CLIENT_ID}&submodules=geocoder`}
      strategy={'beforeInteractive'}></Script>
    </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';

