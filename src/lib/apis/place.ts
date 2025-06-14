import apiClient from '@/lib/apis/apiClient';
import { GET_PLACE_API } from '@/lib/apis/command';
import { useQuery } from '@tanstack/react-query';


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

