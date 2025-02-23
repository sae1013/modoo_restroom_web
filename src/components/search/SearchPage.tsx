'use client';

import React, { useEffect, useState } from 'react';
import NaverMap from '@/components/NaverMap';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import Board from '@/app/search/Board';
import axios from 'axios';

interface SearchPageProps {
  data: any;
}

const SearchPage = ({ data }: SearchPageProps) => {
  const [open, setOpen] = React.useState(false);
  const [restrooms, setRestrooms] = useState(data);
  const [newRestroom, setNewRestroom] = useState({});
  console.log(data);
  const onCloseCallback = () => {
    setOpen(false);
  };

  const onClickMapHandler = (addrAndGeoInfo: object) => {
    // console.log('addrAndGeoInfo', addrAndGeoInfo);
    const selectedRestroom = restrooms.find(x => x.lat.toString() === addrAndGeoInfo.lat && x.lng.toString() === addrAndGeoInfo.lng);
    // console.log(selectedRestroom);
    if (selectedRestroom) return;
    setNewRestroom(addrAndGeoInfo);
    setOpen(true);
  };

  useEffect(() => {
    restrooms.map(restroom => {

      let marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(restroom.lng, restroom.lat),
        map: window.map,
      });
      window.naver.maps.Event.addListener(marker, 'click', () => {
        console.log('marker', marker);
      });
    });
  }, [data]);

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

export default SearchPage;
