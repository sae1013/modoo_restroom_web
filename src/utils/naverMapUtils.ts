export const getViewportBounds = () => {
  const { _ne, _sw } = window.map.getBounds();
  return { swLat: _sw.y, swLng: _sw.x, neLat: _ne.y, neLng: _ne.x };
};

export const moveMapToTargetLocation = (lat: number, lng: number) => {
  const newCenter = new window.naver.maps.LatLng(lat, lng);
  window.map.setCenter(newCenter);
};
