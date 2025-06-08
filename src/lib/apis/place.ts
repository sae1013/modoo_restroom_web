import apiClient from '@/lib/apis/apiClient';
import { GET_PLACE_API } from '@/lib/apis/command';
import { useQuery } from '@tanstack/react-query';

// const fetchPlaces = async (lat: number, lng: number, radius: number) => {
//   try {
//     const res = await axios.get(`http://192.168.219.128:8000/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
//
// };
export const fetchPlaces = async (lat, lng, radius) => {
  const data = await apiClient.request(GET_PLACE_API, {
    queryParams: {
      lat, lng, radius,
    },
  });
  return data;
};

export const usePlaces = (lat, lng, radius, hasInitLocation) => {
  return useQuery({
    queryKey: ['places'],
    queryFn: () => {
      return fetchPlaces(lat, lng, radius);
    },
    enabled: !!lat && !!lng && !!hasInitLocation,
  });
};

