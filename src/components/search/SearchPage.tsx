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
  const [initialLocation, setInitialLocation] = useState(null);
  const myMarkerRef = useRef<any>(null);


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

  // 웹뷰 개발모드에서만 사용
  useEffect(() => {
    if (!window.ReactNativeWebView) {
      const initialStaticLocation = {
        lat: 36.78662503200313,
        lng: 127.1005800034602,
      };
      setCurrentLocation(initialStaticLocation);
      setInitialLocation(initialStaticLocation);
    }

  }, []);

  const moveMapToTargetLocation = (lat: number, lng: number) => {
    const newCenter = new window.naver.maps.LatLng(lat, lng);
    window.map.panTo(newCenter);
  };

  const markCurrentPosition = (lat: number, lng: number) => {
    // 현재위치가 없다면 새로 생성
    if (!myMarkerRef.current) {
      let myMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map: window.map,
        icon: {
          content: `<div style="
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #FF5722;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        "></div>`,
          // 마커의 중심을 맞추기 위해 width, height 1/2 크기를 anchor로 지정
          anchor: new window.naver.maps.Point(10, 10),
        },
      });
      myMarkerRef.current = myMarker;
      return;
    }
    // 위치 업데이트
    myMarkerRef.current.setPosition(new window.naver.maps.LatLng(lat, lng));

  };

  const handleClickMyLocation = () => {
    if (!currentLocation) return;
    const { lat, lng } = currentLocation;
    moveMapToTargetLocation(lat, lng);
  };

  // 나의 위치 추적
  useEffect(() => {
    if (!currentLocation) return;
    const { lat, lng } = currentLocation;
    markCurrentPosition(lat, lng);
  }, [currentLocation]);

  // 초기 카메라 이동(내위치)
  useEffect(() => {
    if (!initialLocation) return;
    moveMapToTargetLocation(initialLocation);
  }, [initialLocation]);

  useEffect(() => {
    window.updateCurrentLocation = (lat, lng) => {
      setCurrentLocation({
        lat, lng,
      });
    };
  }, []);

  // 초기위치 지정
  useEffect(() => {
    if (!initialLocation || !currentLocation) {
      setInitialLocation(currentLocation);
    }
  }, [currentLocation]);

  const getViewportBounds = () => {
    const { _ne, _sw } = window.map.getBounds();
    return { swLat: _sw.y, swLng: _sw.x, neLat: _ne.y, neLng: _ne.x };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!currentLocation) {
        return;
      }
      const { lat, lng } = currentLocation;

      // const { swLat, swLng, neLat, neLng } = getViewportBounds();
      const radius = 3000;
      const res = await axios.get(`http://192.168.219.118:8000/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      setPlaces(res.data);
    };

    fetchData();
  }, [currentLocation]);


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
        <MdOutlineMyLocation size={25} color="#55CBCD"></MdOutlineMyLocation>
      </div>
    </>
  );
};

export default SearchPage;
