import apiClient from '@/lib/apis/apiClient';
import { DELETE_REVIEW, GET_REVIEW_API, GET_REVIEW_BY_ID_API } from '@/lib/apis/command';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ReviewsResult {
  reviews: any[];
  reviewCount: number;
  ratingAvg: number;
}

interface ReviewsResponse {
  result: ReviewsResult;
}

export const fetchReviews = async (placeId: number): Promise<ReviewsResponse> => {
  const result = await apiClient.request(GET_REVIEW_BY_ID_API, {
    pathParams: { placeId },
  });
  return result as ReviewsResponse;
};

export const useReviews = (placeId: number) => {
  return useQuery<ReviewsResponse>({
    queryKey: ['reviews', placeId],
    queryFn: () => fetchReviews(placeId),
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