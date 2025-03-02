'use client';

import React, { useEffect, useState } from 'react';
import NaverMap from '@/components/NaverMap';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import EmptyBottomSheet from '@/components/search/EmptyBottomSheet';

interface SearchPageProps {
  data: any;
}

const SearchPage = ({ data }: SearchPageProps) => {
  const { openModal, closeModal } = useModal();
  const [restrooms, setRestrooms] = useState(data);
  const [newRestroom, setNewRestroom] = useState({});
  console.log(data);

  const onClickMapHandler = (addrAndGeoInfo: object) => {
    const selectedRestroom = restrooms.find((x) => x.lat.toString() === addrAndGeoInfo.lat && x.lng.toString() === addrAndGeoInfo.lng);

    if (selectedRestroom) return;

    setNewRestroom(addrAndGeoInfo);
    openModal({
      component: EmptyBottomSheet,
      props: {
        title: '제목1',
      },
      key: 'bottomsheet1',
    });
  };

  useEffect(() => {
    restrooms.map((restroom) => {
      let marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(restroom.lng, restroom.lat),
        map: window.map,
      });
      window.naver.maps.Event.addListener(marker, 'click', () => {
        console.log('marker', marker);
        // 바텀시트를 모달 처럼 띄우기.
        // 클릭한 장소에대한 모달을 띄우기.
        // 싱글톤으로 하나의 모달만 띄우고, 이미 떠있는 경우는 닫고 띄우기
      });
    });
  }, [data]);

  return (
    <>
      <NaverMap onClick={onClickMapHandler} />
      {/*{open && <BottomSheet onCloseCallback={onCloseCallback}>*/}
      {/*  <div>*/}
      {/*    <p>아직 등록된 적이 없는 장소예요!</p>*/}
      {/*    <p>주소: <span>{newRestroom?.jibunAddress}</span></p>*/}

      {/*    <p>화장실 정보를 공유해주세요</p>*/}
      {/*    /!*<Board></Board>*!/*/}
      {/*  </div>*/}

      {/*</BottomSheet>}*/}
    </>
  );
};

export default SearchPage;
