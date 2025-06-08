'use client';
import { css } from '@styled-system/css';
import { usePlaces } from '@/lib/apis/place';
import { useEffect } from 'react';
import LogService from '@/utils/LogService';

const Page = () => {


  const register = () => {
    console.log('클릭');
    window.ReactNativeWebView.postMessage(JSON.stringify({
      command: 'ADD_LISTENER_WATCH_LOCATION',
      param: {
        callback: 'watchLocationListener',
      },
    }));
    // @ts-ignore
    (window as any).watchLocationListener = ({ lat, lng }) => {
      console.log(lat, lng);
    };

  };

  const unregister = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      command: 'REMOVE_LISTENER_WATCH_LOCATION',
    }));
  };

  return (<div>
    <p>테스트페이지</p>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      marginTop: '300px',
    }}>
      <button style={{}} onClick={() => {
        register();
      }}>리스너 등록
      </button>
      <button onClick={unregister}>리스너 해제</button>
      <button onClick={() => {
      }}>위치 받아오기.
      </button>
      <button onClick={() => {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          command: 'REQUEST_LOCATION_PERMISSION',
          param: {
            callback: 'requestLocationPermission',
          },
        }));
        (window as any).requestLocationPermission = (status: boolean) => {
          console.log(status);
        };
      }}>위치권한 체크
      </button>
      <button onClick={() => {
        // TODO: 네이티브에 위치권한 팝업 요청.
        window.ReactNativeWebView.postMessage(JSON.stringify({
          command: 'LINK_TO_LOCATION_SETTING',
        }));
      }}>위치 권한 팝업 띄우기.
      </button>
      <button onClick={() => {
        (window as any).requestLocationPermission = (status: boolean) => {
          console.log(status);
        };

        window.ReactNativeWebView.postMessage(JSON.stringify({
          command: 'WATCH_FOREGROUND_LOCATION_PERMISSION',
          param: {
            callback: 'requestLocationPermission',
          },
        }));

      }}>
        foreground 위치권한 변경 콜백 등록
      </button>
    </div>

  </div>);

};
export default Page;
