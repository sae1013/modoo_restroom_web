'use client';

import React, { useEffect, useRef } from 'react';
import {
  ReverseGeocodeResponse, ServiceStatus, ReverseGeocodeAddress,
} from '@api/naver_map';

function checkLastString(word: string, lastString: string) {
  return new RegExp(lastString + '$').test(word);
}

function hasAddition(addition: { value: string }) {
  return !!(addition && addition.value);
}

interface NaverMapProps {
  width?: string | number;
  height?: string | number;
  lat?: number;
  lng?: number;
  zoom?: number;
}

const NaverMap = ({ width = '100%', height = 500, lat = 37.511337, lng = 127.012084, zoom = 15 }: NaverMapProps) => {
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

  const onClickMapListener = (e: { coord: object }) => {
    searchCoordinateToAddress(e.coord);
  };
  const initGeocoder = () => {
    window.map.addListener('click', onClickMapListener);
  };

  const makeAddress = (item: ReverseGeocodeAddress) => {
    if (!item) {
      return;
    }

    let name = item.name,
      region = item.region,
      land = item.land,
      isRoadAddress = name === 'roadaddr';

    let sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';


    sido = region.area1.name || '';

    sigugun = region.area2.name || '';

    dongmyun = region.area3?.name || '';

    ri = region.area4?.name || '';

    if (land) {
      if (land.number1) {
        if (land.type && land.type === '2') {
          rest += '산';
        }

        rest += land.number1;

        if (land.number2) {
          rest += ('-' + land.number2);
        }
      }

      if (isRoadAddress) {
        if (checkLastString(dongmyun, '면')) {
          ri = land.name || '';
        } else {
          dongmyun = land.name || '';
          ri = '';
        }

        if (hasAddition(land.addition0)) {
          rest += ' ' + land.addition0.value;
        }
      }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
  };
  const searchCoordinateToAddress = (latlng: object) => {
    const { infoWindow, map, naver } = window;
    infoWindow.close();

    naver.maps.Service.reverseGeocode({
      coords: latlng,
      orders: [
        naver.maps.Service.OrderType.ADDR,
        naver.maps.Service.OrderType.ROAD_ADDR,
      ].join(','),
    }, function(status: 200 | 500, response: ReverseGeocodeResponse) {

      if (status === naver.maps.Service.Status.ERROR) {
        return alert('Something Wrong!');
      }
      const items = response.v2.results;

      let address = '';
      let htmlAddresses = [];

      for (const [index, item] of items.entries()) {
        address = makeAddress(item) || '';
        const addrType = item.name === 'roadaddr' ? '[도로명주소]' : '[지번주소]';
        htmlAddresses.push(`${index + 1}. ${addrType}: ${address}`);
      }
      const infoContent = [
        '<div style="padding:10px;min-width:200px;line-height:150%;">',
        '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
        htmlAddresses.join('<br />'),
        '</div>',
      ].join('\n');

      infoWindow.setContent(infoContent);
      infoWindow.setOptions({
        maxWidth: 140,
        backgroundColor: '#eee',
        borderColor: '#2db400',
        borderWidth: 1,
        anchorSize: new naver.maps.Size(10, 10),
        anchorSkew: true,
        anchorColor: '#eee',
      });

      infoWindow.open(map, latlng);
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
