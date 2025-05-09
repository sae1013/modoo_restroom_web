'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ReverseGeocodeResponse } from '@api/naver_map';
import './marker.scss';
import { useStore } from 'zustand';
import { useMapStore } from '@/provider/root-store-provider';

interface NaverMapProps {
  width?: string | number;
  height?: string | number;
  lat?: number;
  lng?: number;
  zoom?: number;
  minZoom?: number;
  onClick?: (addresses: object) => void;
}

const NaverMap = ({
                    width = '100%',
                    height = '100vh',
                    lat = 36.78658467350526,
                    lng = 127.100353085028,
                    zoom = 17,
                    minZoom = 14,
                    onClick,
                  }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [hasInitialize, setHasInitialize] = useState<boolean>(false);
  const { setMapLoaded } = useMapStore(state => state);
  // Map 초기화 함수
  const initMap = () => {

    const { naver } = window;
    if (!naver || !mapRef.current) {
      return;
    }
    if (mapInstance.current) return;
    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(lat, lng),
      zoom,
      minZoom: 14,
      mapTypeControl: false,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      zoomControl: false,
    });
    mapInstance.current = map;

    // 전역 변수에 저장
    window.map = map;
    setHasInitialize(true);
    setMapLoaded(true);
    map.setCursor('pointer');
  };

  // 지도 클릭 핸들러 (최신 onClick을 사용하기 위해 useCallback 사용)
  const onClickMapListener = useCallback(async (e: { coord: any }) => {
    const selectedAddrInfo: object = await searchCoordinateToAddress(e.coord);
    console.log('selectedAddrInfo', selectedAddrInfo);
    const coordInfo = await searchAddressToCoord(selectedAddrInfo);

    if (onClick) {
      onClick({ ...selectedAddrInfo, lat: Number(coordInfo.lat || 0), lng: Number(coordInfo.lng || 0) });
    }
  }, [onClick]);

  // 좌표를 기반으로 주소 검색
  const searchCoordinateToAddress = async (latlng: object): Promise<object> => {
    const { naver } = window;

    return new Promise((resolve, reject) => {
      naver.maps.Service.reverseGeocode(
        {
          coords: latlng,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(','),
        },
        function(status: any, response: ReverseGeocodeResponse) {
          if (status === naver.maps.Service.Status.ERROR) {
            reject('존재하지 않는 주소');
          }

          const selectedCoordInfo = {
            jibunAddress: response.v2.address.jibunAddress || '',
            roadAddress: response.v2.address.roadAddress || '',
          };
          resolve(selectedCoordInfo);
        },
      );
    });
  };

  // 주소를 기반으로 좌표 검색
  const searchAddressToCoord = async (addressInfo: any) => {
    const { naver } = window;
    const { jibunAddress, roadAddress } = addressInfo;
    return new Promise((resolve, reject) => {
      naver.maps.Service.geocode(
        {
          query: roadAddress || jibunAddress,
        },
        (status, response) => {
          resolve({
            lat: response.v2.addresses[0].y,
            lng: response.v2.addresses[0].x,
          });
        },
      );
    });
  };

  // Map 로드 시 initMap 실행
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => {
        window.removeEventListener('load', initMap);
      };
    }
  }, []);

  // initMap 완료 후 이벤트 리스너 등록
  useEffect(() => {
    let listener: any;
    if (hasInitialize && window.map) {
      // NaverMap API의 addListener를 사용하여 이벤트 핸들러 등록
      listener = window.naver.maps.Event.addListener(window.map, 'click', onClickMapListener);
    }
    return () => {
      // 등록된 리스너가 있으면 제거
      if (listener) {
        window.naver.maps.Event.removeListener(listener);
      }
    };
  }, [hasInitialize, onClick]);

  return (
    <div ref={mapRef} style={{ width, height }}></div>
  );
};

export default NaverMap;
