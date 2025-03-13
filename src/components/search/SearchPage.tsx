'use client';

import React, { useEffect, useState } from 'react';
import NaverMap from '@/components/NaverMap';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import EmptyBottomSheet from '@/components/search/EmptyBottomSheet';
import ReviewBottomSheet from '@/components/search/ReviewBottomSheet';

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
    // TODO: 핀을 클릭 시에 아래 모달을 띄움.
    openModal({
      component: ReviewBottomSheet,
      props: {},
      key: 'reviewBottomSheet',
    });
    // TODO: 리뷰 개발 후 주석 해제
    // TODO: 리뷰 카운팅. 보여주기
    // openModal({
    //   component: EmptyBottomSheet,
    //   props: {
    //     title: '제목1',
    //   },
    //   key: 'unregistered',
    // });
  };

  useEffect(() => {
    restrooms.map((restroom) => {
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
      <NaverMap onClick={onClickMapHandler} />

    </>
  );
};

export default SearchPage;
