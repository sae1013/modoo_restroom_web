'use client';
import React from 'react';
import NaverMap from '@/components/NaverMap';

const Page = () => {

  const onClickMapHandler = (addresses: string[]) => {
    console.log('addresses', addresses);
  };
  return (
    <NaverMap onClick={onClickMapHandler} />
  );
};

export default Page;
