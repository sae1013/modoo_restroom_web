'use client';

import React, { useEffect, useRef } from 'react';

interface NaverMapProps {
  width?: string | number;
  height?: string | number;
  lat?: number;
  lng?: number;
  zoom?: number;
}

const NaverMap = ({ width = '100%', height = 500, lat = 37.511337, lng = 127.012084, zoom = 15 }: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (!window.naver || !mapRef.current) {
        return;
      }
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(lat, lng), zoom,
      });

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
      });
    };
    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      window.addEventListener('load', initMap);
      return () => window.removeEventListener('load', initMap);
    }

  }, []);

  return (
    <>
      <div ref={mapRef} style={{ width, height }}></div>
    </>
  );
};

export default NaverMap;
