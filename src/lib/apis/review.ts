import apiClient from '@/lib/apis/apiClient';
import { DELETE_REVIEW, GET_PLACE_API } from '@/lib/apis/command';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const fetchReviews = async () => {
  const data = await apiClient.request(GET_PLACE_API);
  return data;
};

export const useReviews = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: fetchReviews,
  });
};

export const deleteReview = async (id: number) => {
  const data = await apiClient.request(DELETE_REVIEW, {
    body: {
      id,
    },
  });
  return data;
};

export const useDeleteReview = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
    },
    onError: (error: any) => {
      console.error('리뷰삭제실패');
    },
  });
};