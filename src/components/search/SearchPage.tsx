'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import NaverMap from '@/components/NaverMap';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import { GrRefresh } from 'react-icons/gr';
import { MdOutlineMyLocation } from 'react-icons/md';

import useModal from '@/hooks/useModal';
import EmptyBottomSheet from '@/components/search/EmptyBottomSheet';
import ReviewBottomSheet from '@/components/search/ReviewBottomSheet';
import axios from 'axios';
import { css } from '@styled-system/css';

interface SearchPageProps {
  data: any;
}

const SearchPage = ({ data }: SearchPageProps) => {
  const { openModal, closeModal } = useModal();
  const [places, setPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const markerRef = useRef<any>(null);
  const watchIdRef = useRef<number | null>(null);
  const [isFirstFetched, setIsFirstFetched] = useState(false);

  const onClickMapHandler = useCallback((addrAndGeoInfo: any) => {
    const existPlace = places.find((place: any) => place.location.coordinates[1] === Number(addrAndGeoInfo.lat) && place.location.coordinates[0] === Number(addrAndGeoInfo.lng));

    if (existPlace) {
      openModal({
        component: ReviewBottomSheet,
        props: {},
        key: 'reviewBottomSheet',
      });
      return;
    }
    openModal({
      component: EmptyBottomSheet,
      props: {
        title: '제목1',
      },
      key: 'unregistered',
    });
    return;

  }, [places.length]);


  const moveMapToCurrentLocation = (lat, lng) => {
    const newCenter = new window.naver.maps.LatLng(lat, lng);
    window.map.setCenter(newCenter);
  };

  const handleClickMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('현재 위치:', lat, lng);
          // 여기서 네이버맵 이동 함수를 호출합니다.
          moveMapToCurrentLocation(lat, lng);
        },
        (error) => {
          console.error('위치 정보를 가져오는데 실패:', error);
        },
        {
          enableHighAccuracy: true, // 높은 정확도 요청 (옵션)
          timeout: 5000,
          maximumAge: 0,
        },
      );
    }
  };

  useEffect(() => {
    window.updateCurrentLocation = (lat, lng) => {
      setCurrentLocation({
        lat, lng,
      });
    };
  }, []);

  // useEffect(() => {
  //   moveMapToCurrentLocation(37.4934876, 127.1115075);
  // }, []);

  const getViewportBounds = () => {
    const { _ne, _sw } = window.map.getBounds();
    return { swLat: _sw.y, swLng: _sw.x, neLat: _ne.y, neLng: _ne.x };
  };

  useEffect(() => {
    const fetchData = async () => {
      // TODO: 네이티브 브릿지로 현재위치 받아오고, 현재위치기준으로 fetch.
      // TODO: 현재 좌표를 기준으로 center 지정. 그이후에는 marker를 업데이트.
      if (isFirstFetched || !currentLocation) {
        return;
      }
      const { lat, lng } = currentLocation;
      moveMapToCurrentLocation(lat, lng);
      // const { swLat, swLng, neLat, neLng } = getViewportBounds();
      const radius = 3000;
      const res = await axios.get(`http://192.168.219.118:8000/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      setPlaces(res.data);
      setIsFirstFetched(true);
    };

    fetchData();
  }, [currentLocation, isFirstFetched]);


  useEffect(() => {
    places.map((place: any) => {
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
      <div className={css({
        zIndex: 99,
        position: 'fixed',
        bottom: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '30px',
        fontSize: '13px',
        gap: '5px',
        padding: '5px 10px',
        boxShadow: '0px 0px 5px rgba(0,0,0,0.4)',


      })}>
        <GrRefresh size={18}></GrRefresh>
        <p>이지역 재검색</p>
      </div>
      <div className={css({
        zIndex: 99,
        position: 'fixed',
        bottom: '30px',
        right: '20px',
        padding: '8px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        boxShadow: '0px 0px 5px rgba(0,0,0,0.4)',
      })} onClick={handleClickMyLocation}>
        <MdOutlineMyLocation size={20} color="#55CBCD"></MdOutlineMyLocation>
      </div>
    </>
  );
};

export default SearchPage;
