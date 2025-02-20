'use client';
import React, { useEffect, useState } from 'react';
import NaverMap from '@/components/NaverMap';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import Board from '@/app/search/Board';
import axios from 'axios';

const Page = () => {
  const [open, setOpen] = React.useState(false);
  const [restrooms, setRestrooms] = useState([]);
  const [newRestroom, setNewRestroom] = useState({});

  const onCloseCallback = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get('http://localhost:8000/restrooms');
  //     setRestrooms(res.data);
  //
  //   };
  //   fetchData();
  // }, []);

  const onClickMapHandler = (addrAndGeoInfo: object) => {
    console.log(addrAndGeoInfo);
    const selectedRestroom = restrooms.find(x => x.jibunAddress === addrAndGeoInfo.jibunAddress || x.roadAddress === addrAndGeoInfo.roadAddress);
    if (selectedRestroom) return;
    setNewRestroom(addrAndGeoInfo);
    setOpen(true);
  };

  return (
    <>
      <div>heheheh</div>
      <NaverMap onClick={onClickMapHandler} />
      {open && <BottomSheet onCloseCallback={onCloseCallback}>
        <div>
          <p>아직 등록된 적이 없는 장소예요!</p>
          <p>주소: <span>{newRestroom?.jibunAddress}</span></p>

          <p>화장실 정보를 공유해주세요</p>
          <Board></Board>
        </div>

      </BottomSheet>}
    </>

  );
};

export default Page;
