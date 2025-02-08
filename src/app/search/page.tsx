'use client';
import React from 'react';
import NaverMap from '@/components/NaverMap';
import BottomSheet from '@/components/bottomsheet/BottomSheet';

const Page = () => {
  const [open, setOpen] = React.useState(false);

  const onCloseCallback = () => {
    setOpen(false);
  };

  const onClickMapHandler = (addresses: object) => {
    console.log('addresses', addresses);
    setOpen(true);

    // 서버에 address를 넘기고 API 조회, 등록되어있는지 여부 체크
    //

    // 동작1. 핀을 클릭했거나, 클릭한지점

    // 동작2. 클릭한 지점
  };
  return (
    <>
      <NaverMap onClick={onClickMapHandler} />
      {open && <BottomSheet onCloseCallback={onCloseCallback}></BottomSheet>}
    </>

  );
};

export default Page;
