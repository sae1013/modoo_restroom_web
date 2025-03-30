export const getViewportBounds = () => {
  const { _ne, _sw } = window.map.getBounds();
  return { swLat: _sw.y, swLng: _sw.x, neLat: _ne.y, neLng: _ne.x };
};