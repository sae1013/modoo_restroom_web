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

  // 지점을 클릭할 때마다 선택된 화장실 정보를 넘김.
  const onClickMapHandler = (addrAndGeoInfo: object) => {
    const selectedRestroom = restrooms.find((x) => x.lat.toString() === addrAndGeoInfo.lat && x.lng.toString() === addrAndGeoInfo.lng);

    //  첫 등록시, 바텀시트로 오픈.
    if (selectedRestroom) return;
    setNewRestroom(addrAndGeoInfo);
    setOpen(true);
  };

  useEffect(() => {
    restrooms.map((restroom) => {
      let marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(restroom.lng, restroom.lat),
        map: window.map,
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        // 마커를 클릭 시, 매칭된 마커의 정보대로 화장실 정보 바텀시트 업
        console.log('marker', marker);
      });
    });
  }, [data]);

  return (
    <>
      <NaverMap onClick={onClickMapHandler} />
      {open && (
        <BottomSheet onCloseCallback={onCloseCallback}>
          <div>
            <p>아직 등록된 적이 없는 장소예요!</p>
            <p>
              주소: <span>{newRestroom?.jibunAddress}</span>
            </p>

            <p>화장실 정보를 공유해주세요</p>
            <Board></Board>
          </div>
        </BottomSheet>
      )}
    </>
  );
};

export default SearchPage;
