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
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await axios.get('http://jsonplaceholder.typicode.com/posts/');
  const initUser = {
    user: {
      email: 'zxcasd',
    },
  };
  // 어차피 여기서 쿠기값을 읽을거니까... 여기서는 유저정보를 받아서 스토어에 초기화하는용도.

  // const initUser = null;

  return (
    <html lang="ko" className={pretendard.className}>
    <body>
    <StyledJsxRegistry>
      <ReactQueryProviders>
        <RootStoreProvider userData={initUser}>
          {/*<div id="modal-root"></div>*/}
          <Modal></Modal>
          {/*<InitWebviewCallback></InitWebviewCallback>*/}
          <HeaderLayout></HeaderLayout>
          <Toaster></Toaster>
          <AnimationPageRoute>
            {children}
          </AnimationPageRoute>
        </RootStoreProvider>
      </ReactQueryProviders>
    </StyledJsxRegistry>

    <Script
      src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_CLIENT_ID}&submodules=geocoder`}
      strategy={'beforeInteractive'}></Script>
    </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
