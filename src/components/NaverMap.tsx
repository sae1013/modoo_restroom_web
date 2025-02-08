'use client';

import React, { useEffect, useRef } from 'react';
import {
  ReverseGeocodeResponse, ServiceStatus, ReverseGeocodeAddress,
} from '@api/naver_map';
import { makeAddress } from '@/lib/map_utils';


interface NaverMapProps {
  width?: string | number;
  height?: string | number;
  lat?: number;
  lng?: number;
  zoom?: number;
  onClick?: (addresses: string[]) => void;
}

const NaverMap = ({
                    width = '100%',
                    height = 500,
                    lat = 37.511337,
                    lng = 127.012084,
                    zoom = 15,
                    onClick,
                  }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    const { naver } = window;
    if (!naver || !mapRef.current) {
      return;
    }
    const map = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(lat, lng), zoom, mapTypeControl: true,
    });

    let infoWindow = new naver.maps.InfoWindow({
      anchorSkew: true,
    });

    window.map = map;
    window.infoWindow = infoWindow;

    new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map,
    });
    map.setCursor('pointer');
  };

  const onClickMapListener = async (e: { coord: object }) => {
    const addressInfo: object = await searchCoordinateToAddress(e.coord);
    // console.log('asd', addresses);
    if (onClick) {
      onClick(addressInfo);
    }

  };
  const initGeocoder = () => {
    window.map.addListener('click', onClickMapListener);
  };

  const searchCoordinateToAddress = async (latlng: object): Promise<object> => {
    const { infoWindow, map, naver } = window;
    infoWindow.close();
    let addresses: string[] = [];

    return new Promise((resolve, reject) => {
      naver.maps.Service.reverseGeocode({
        coords: latlng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(','),
      }, async function(status: 200 | 500, response: ReverseGeocodeResponse) {

        console.log(latlng);
        // 유저가 클릭했을 때, y,x 정보로 클릭한 지점의 jibun,address 알아내고 이게 등록되어있는지? 살펴본다.
        // jibun으로 먼저 캐시를 찾아본다. 없으면 새로생성하고 캐시에 저장한다.

        if (status === naver.maps.Service.Status.ERROR) {
          reject('존재하지 않는 주소');

        }
        const items = response.v2.results;


        const selectedCoordInfo = {
          // id: items[0]?.code?.mappingId || items[1]?.code?.mappingId,
          jibunAddress: response.v2.address.jibunAddress || '',
          roadAddress: response.v2.address.jibunAddress || '',
          // lat: latlng._lat,
          // lng: latlng._lng,
        };


        // for (const [index, item] of items.entries()) {
        //   address = makeAddress(item) || '';
        //   addresses.push(address);
        //
        //   const addrType = item.name === 'roadaddr' ? '[도로명주소]' : '[지번주소]';
        //   htmlAddresses.push(`${index + 1}. ${addrType}: ${address}`);
        // }

        resolve(selectedCoordInfo);
      });

    });
  };

  useEffect(() => {
    if (window.naver && window.naver.maps) {
      initMap();
      initGeocoder();

    } else {
      window.addEventListener('load', initMap);
      return () => {
        window.removeEventListener('load', initMap);
        window.map.removeListener('click');
      };
    }

  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width, height }}></div>
    </>
  );
};

export default NaverMap;
