'use client';
// Location Callback 과 관련된 훅
import React, { useEffect } from 'react';


export const useLocation = (setCurrentLocation: any, setIsGranted: any, setHasInitLocation: any) => {
  const [isLoadedCallBack, setIsLoadedCallback] = React.useState(false);
  useEffect(() => {
    (window as any).getCurrentLocation = (lat, lng) => {
      setCurrentLocation({ lat, lng });
      setHasInitLocation(true);
    };

    (window as any).requestLocationPermission = (status: boolean) => {
      setIsGranted(status);
    };

    (window as any).watchLocationListener = (lat, lng) => {
      setCurrentLocation({ lat, lng });
    };
    setIsLoadedCallback(true);
  }, []);
  return isLoadedCallBack;

};
