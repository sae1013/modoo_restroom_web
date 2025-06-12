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
import { NATIVE_MSG } from '@/lib/natives/message';
import NativeMsgService from '@/lib/natives/NativeMsgService';
import { usePlaceStore } from '@/provider/root-store-provider';
import useToast from '@/hooks/useToast';
import AlertPopup from '@/components/popup/AlertPopup';
import { useLocation } from '@/hooks/useLocation';
import ConfirmPopup from '@/components/popup/ConfirmPopup';
import { IoMdSettings } from 'react-icons/io';
import apiClient from '@/lib/apis/apiClient';
import { GET_PLACE_API } from '@/lib/apis/command';
import { moveMapToTargetLocation } from '@/utils/naverMapUtils';

type ICurrentLocation = {
  lat: number;
  lng: number;
};

interface SearchPageProps {
  data: any;
}

const SearchPage = ({ data }: SearchPageProps) => {
  const { openModal, closeModal } = useModal();
  const { places, setPlaces } = usePlaceStore((state) => state);
  const [currentLocation, setCurrentLocation] = useState<ICurrentLocation>({
    lat: 37.48145437352808,
    lng: 127.12379119155949,
  });

  // 한번이라도 위치정보를 얻는다면 true.
  const [hasInitLocation, setHasInitLocation] = useState(false);
  const [isGranted, setIsGranted] = useState(true);
  const isGrantedRef = useRef(isGranted);

  const [isGpsGranted, setGpsGranted] = useState(false);
  const isLoadedCallback = useLocation(setCurrentLocation, setIsGranted, setHasInitLocation, setGpsGranted);

  const { popToastMessage } = useToast();

  const myMarkerRef = useRef<any>(null); // 현재 내위치의 마커
  const markersRef = useRef<any[]>([]);

  const onClickMapHandler = useCallback(
    (addrAndGeoInfo: any) => {
      const { roadAddress, jibunAddress, lat, lng } = addrAndGeoInfo;
      let name = roadAddress || jibunAddress;

      const existPlace = places.find((place: any) => place.location.coordinates[1] === Number(addrAndGeoInfo.lat) && place.location.coordinates[0] === Number(addrAndGeoInfo.lng));

      // 이미 존재하는 장소를 찍은경우
      if (existPlace) {
        openModal({
          component: ReviewBottomSheet,
          props: { placeId: existPlace?.id, name, roadAddress, jibunAddress, lat, lng },
          key: 'reviewBottomSheet',
        });
        return;
      }

      openModal({
        component: EmptyBottomSheet,
        props: { name, roadAddress, jibunAddress, lat, lng, setPlaces },
        key: 'unregistered',
      });
      return;
    },
    [places.length],
  );

  const getCurrentViewCenter = () => {
    const center = window.map.getCenter();
    const { _lng, _lat } = center;

    return {
      lat: _lat,
      lng: _lng,
    };
  };

  const fetchPlaces = async (lat: number, lng: number, radius: number) => {
    try {
      const res = await apiClient.request(GET_PLACE_API, {
        queryParams: {
          lat,
          lng,
          radius,
        },
      });
      return res;
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
    // drawMarkers(places);
  };

  const createStaticHTML = (jsxElement) => {
    return ReactDOMServer.renderToStaticMarkup(jsxElement);
  };

  const drawMarkers = (places: any) => {
    // popToastMessage('success', `반경에 ${places?.length}개의 화장실이 있어요`);
    // 기존의 마커들을 삭제.
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

    places.forEach((place) => {
      const position = new window.naver.maps.LatLng(place.lat, place.lng);
      const marker = new window.naver.maps.Marker({
        position,
        map: window.map,
        title: place.id,
        icon: {
          content: createStaticHTML(<Marker />),
          anchor: new window.naver.maps.Point(15, 15),
        },
      });
      // 이벤트리스너 등록
      window.naver.maps.Event.addListener(marker, 'click', function(e) {
        triggerHaptic();
        openModal({
          component: ReviewBottomSheet,
          props: {
            placeId: place.id,
            name: place.name,
            roadAddress: place.roadAddr,
            jibunAddress: place.jibunAddr,
            lat: place.lat,
            lng: place.lng,
          },
          key: 'reviewBottomSheet',
        });
      });

      markersRef.current.push(marker);
    });
  };

  const markCurrentPosition = (lat: number, lng: number) => {
    if (!window.naver?.maps) return;

    // 현재위치가 없다면 새로 생성
    if (!myMarkerRef.current) {
      let myMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map: window.map,
        icon: {
          content: `<div style="
          position: relative;
          z-index:150;
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
    // 기존 위치 업데이트
    myMarkerRef.current.setPosition(new window.naver.maps.LatLng(lat, lng));
  };

  const handleClickMyLocation = () => {
    if (!currentLocation) return;
    const { lat, lng } = currentLocation;
    moveMapToTargetLocation(lat, lng);
  };

  useEffect(() => {
    isGrantedRef.current = isGranted;
  }, [isGranted]);

  useEffect(() => {
    if (!currentLocation) return;
    const { lat, lng } = currentLocation;
    markCurrentPosition(lat, lng);
  }, [currentLocation]);

  /**
   * ----------------위치 추적 hooks 등록----------------------
   */
  useEffect(() => {
    // 첫 렌더링시 위치 받아오고, 실시간 리스너등록.
    if (!window.ReactNativeWebView || !isLoadedCallback) return;
    // 현재 위치 받아오기
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        command: 'GET_CURRENT_LOCATION',
        param: {
          callback: 'getCurrentLocation',
        },
      }),
    );

    // 실시간 이벤트 리스너 등록.
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        command: 'ADD_LISTENER_WATCH_LOCATION',
        param: {
          callback: 'watchLocationListener',
        },
      }),
    );
  }, [isLoadedCallback]);

  useEffect(() => {
    // 첫 진입시, foreground 위치 체크 리스너 추가
    if (!window.ReactNativeWebView || !isLoadedCallback) return;
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        command: 'WATCH_FOREGROUND_LOCATION_PERMISSION',
        param: {
          callback: 'requestLocationPermission',
        },
      }),
    );
  }, [isLoadedCallback]);

  // 권한조회
  useEffect(() => {
    if (!window.ReactNativeWebView || !isLoadedCallback) return;
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        command: 'REQUEST_LOCATION_PERMISSION',
        param: {
          callback: 'requestLocationPermission',
        },
      }),
    );
  }, [isLoadedCallback, isGranted]);

  useEffect(() => {
    if (isGranted) {
      return;
    }
    openModal({
      component: ConfirmPopup,
      props: {
        contents: '위치사용 권한이 없습니다. <br/> 확인을 누르면 권한설정 화면으로 이동합니다.',
        Icon: IoMdSettings,
        confirmCallback: () => {
          if (isGrantedRef.current) {
            closeModal();
          } else {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                command: 'LINK_TO_LOCATION_SETTING',
              }),
            );
          }
        },
      },
      key: 'success_popup',
    });
  }, [isGranted]);

  // 위치정보를 받아올 수 있을 때, 자동으로 카메라를 이동
  useEffect(() => {
    if (!hasInitLocation) return;

    moveMapToTargetLocation(currentLocation.lat, currentLocation.lng);
  }, [hasInitLocation]);

  useEffect(() => {
    const fetchData = async () => {
      if (!hasInitLocation) return;
      const { lat, lng } = currentLocation;
      const places = await fetchPlaces(lat, lng, 2000);
      setPlaces(places);
      // drawMarkers(places);
    };
    fetchData();
  }, [hasInitLocation]);

  useEffect(() => {
    if (places.length < 1) return;
    drawMarkers(places);
  }, [places]);

  return (
    <>
      <NaverMap onClick={onClickMapHandler} />
      <HapticWrapper>
        <button
          onClick={handleSearchTargetPlaces}
          className={css({
            zIndex: 99,
            position: 'fixed',
            bottom: '70px',
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
          })}
        >
          <GrRefresh size={18}></GrRefresh>
          <p>이지역 재검색</p>
        </button>
      </HapticWrapper>
      <HapticWrapper>
        <div
          className={css({
            zIndex: 99,
            position: 'fixed',
            bottom: '30px',
            right: '20px',
            padding: '8px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: '0px 0px 5px rgba(0,0,0,0.4)',
          })}
          onClick={handleClickMyLocation}
        >
          <MdOutlineMyLocation size={25} color="#55CBCD"></MdOutlineMyLocation>
        </div>
      </HapticWrapper>
    </>
  );
};

export default SearchPage;
