'use client';
import React from 'react';
import NaverMap from '@/components/NaverMap';

const Page = () => {

  const onClickMapHandler = (addresses: object) => {
    console.log('addresses', addresses);
    // 서버에 address를 넘기고 API 조회, 등록되어있는지 여부 체크
    //

    // 동작1. 핀을 클릭했거나, 클릭한지점

    // 동작2. 클릭한 지점
  };
  return (
    <NaverMap onClick={onClickMapHandler} />
  );
};

export default Page;
