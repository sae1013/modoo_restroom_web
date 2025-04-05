export {};

declare global {
  interface Window {
    // eslint-disable-next-line
    naver: any;
    map: any;
    infoWindow: any;
    ReactNativeWebView: any;

    // Native Bridges
    updateCurrentLocation: any;
    getCurrentLocation: any;
  }
}
