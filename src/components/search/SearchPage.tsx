'use client';

import React, { useEffect, useState } from 'react';
import NaverMap from '@/components/NaverMap';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import useModal from '@/hooks/useModal';
import EmptyBottomSheet from '@/components/search/EmptyBottomSheet';
import ReviewBottomSheet from '@/components/search/ReviewBottomSheet';
import axios from 'axios';

interface SearchPageProps {
  data: any;
}

const SearchPage = ({ data }: SearchPageProps) => {
  const { openModal, closeModal } = useModal();
  const [restrooms, setRestrooms] = useState(data);
  const [places, setPlaces] = useState([]);

  const onClickMapHandler = (addrAndGeoInfo: object) => {
    const selectedRestroom = restrooms.find((x) => x.lat.toString() === addrAndGeoInfo.lat && x.lng.toString() === addrAndGeoInfo.lng);

    if (selectedRestroom) return;

    // setNewRestroom(addrAndGeoInfo);
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

  const getViewportBounds = () => {
    const { _ne, _sw } = window.map.getBounds();
    return { swLat: _sw.y, swLng: _sw.x, neLat: _ne.y, neLng: _ne.x };
  };

  useEffect(() => {
    const fetchData = async () => {
      const { swLat, swLng, neLat, neLng } = getViewportBounds();
      const lat = 37.478609094463415;
      const lng = 127.12624549432981;
      const radius = 3000;
      // const res = await axios.get(`http://localhost:8000/places/geolocation?sw_lat=${swLat}&sw_lng=${swLng}&ne_lat=${neLat}&ne_lng=${neLng}`);
      const res = await axios.get(`http://localhost:8000/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      setPlaces(res.data);

    };

    fetchData();
  }, []);

  useEffect(() => {
    places.map((place) => {
      let marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.lat, place.lng),
        map: window.map,
      });
      window.naver.maps.Event.addListener(marker, 'click', () => {
        console.log('marker', marker);
      });
    });
  }, [places]);

  return (
    <>
      <NaverMap onClick={onClickMapHandler} />
    </>
  );
};

export default SearchPage;
