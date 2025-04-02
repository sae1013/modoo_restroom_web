import apiClient from '@/lib/apis/apiClient';
import { GET_PLACE_API } from '@/lib/apis/command';
import { useQuery } from '@tanstack/react-query';

export const fetchPlaces = async () => {
  const data = await apiClient.request(GET_PLACE_API);
  return data;
};

export const usePlaces = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: fetchPlaces,
  });
};

