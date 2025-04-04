'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import NaverMap from '@/components/NaverMap';
import BottomSheet from '@/components/bottomsheet/BottomSheet';
import { GrRefresh } from 'react-icons/gr';
import { MdOutlineMyLocation } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import useModal from '@/hooks/useModal';
import EmptyBottomSheet from '@/components/search/EmptyBottomSheet';
import ReviewBottomSheet from '@/components/search/ReviewBottomSheet';
import axios from 'axios';
import { css } from '@styled-system/css';
import Marker from '@/components/Marker';
import toast from 'react-hot-toast';
import { triggerHaptic } from '@/utils/nativeBridge';
import HapticWrapper from '@/components/HapticWrapper';

interface SearchPageProps {
  data: any;
}


const SearchPage = ({ data }: SearchPageProps) => {
  const { openModal, closeModal } = useModal();
  const [places, setPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [isFirstFetched, setIsFirstFetched] = useState(false);
  const myMarkerRef = useRef<any>(null); // 현재 내위치의 마커
  const markersRef = useRef<any[]>([]);

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

  const popToastMessage = (message) => {
    toast.success(<div className={css({
      fontWeight: 600,
      fontSize: '14px',
      color: '#404040',
    })}>{message}</div>, {
      removeDelay: 400,
    });
  };

  const moveMapToTargetLocation = (lat: number, lng: number) => {
    const newCenter = new window.naver.maps.LatLng(lat, lng);
    window.map.panTo(newCenter);
  };

  const getCurrentViewCenter = () => {
    const center = window.map.getCenter();
    const { _lng, _lat } = center;

    return {
      lat: _lat, lng: _lng,
    };

  };

  const fetchPlaces = async (lat: number, lng: number, radius: number) => {
    try {
      const res = await axios.get(`http://192.168.219.118:8000/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }

  };

  const handleSearchTargetPlaces = async () => {
    triggerHaptic();
    const { lat, lng } = getCurrentViewCenter();

    const places = await fetchPlaces(lat, lng, 2000);
    setPlaces(places);
    drawMarkers(places);
    // 받아온 장소를 마크.
  };

  const createStaticHTML = (jsxElement) => {
    return ReactDOMServer.renderToStaticMarkup(jsxElement);
  };

  const drawMarkers = (places: any) => {
    popToastMessage(`반경에 ${places.length}개의 화장실이 있어요`);
    console.log('drawMarkers()');
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('drawMarkers()');
    }

    // 기존의 마커들을 삭제.
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    places.forEach(place => {
      const position = new window.naver.maps.LatLng(place.lat, place.lng);
      const marker = new window.naver.maps.Marker({
        position,
        map: window.map,
        title: place.id,
        // 지도 이동시 마커사라짐 버그로 비활성화
        // icon: {
        //   content: createStaticHTML(<Marker />),
        //   // anchor: new window.naver.maps.Point(15, 15),
        // },
      });
      // 이벤트리스너 등록
      window.naver.maps.Event.addListener(marker, 'click', function(e) {
        triggerHaptic();
        openModal({
          component: ReviewBottomSheet,
          props: {},
          key: 'reviewBottomSheet',
        });
      });

      markersRef.current.push(marker);
    });

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

  useEffect(() => {
    const fetchData = async () => {
      if (!currentLocation || isFirstFetched) {
        return;
      }
      const { lat, lng } = currentLocation;
      const places = await fetchPlaces(lat, lng, 2000);
      setPlaces(places);
      drawMarkers(places);
      setIsFirstFetched(true);
    };
    if (isFirstFetched) return;
    fetchData();
  }, [currentLocation, isFirstFetched]);

  return (
    <>
      <NaverMap onClick={onClickMapHandler} />
      <HapticWrapper>
        <button onClick={handleSearchTargetPlaces}
                className={css({
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
        </button>
      </HapticWrapper>
      <HapticWrapper>
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
      </HapticWrapper>
    </>
  );
};

export default SearchPage;
