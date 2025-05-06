import apiClient from '@/lib/apis/apiClient';
import {
  CREATE_REVIEW,
  CREATE_REVIEW_API,
  DELETE_REVIEW,
  GET_REVIEW_API,
  GET_REVIEW_BY_QUERY,
} from '@/lib/apis/command';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ReviewsResult {
  reviews: any[];
  reviewCount: number;
  ratingAvg: number;
}

interface ReviewsResponse {
  result: ReviewsResult;
}

// 조회
export const fetchReviews = async (placeId: number): Promise<ReviewsResponse> => {
  const result = await apiClient.request(GET_REVIEW_BY_QUERY, {
    pathParams: { placeId },
  });
  return result as ReviewsResponse;
};

// 조회
export const useReviews = (placeId: number) => {
  return useQuery<ReviewsResponse>({
    queryKey: ['reviews', placeId],
    queryFn: () => fetchReviews(placeId),
  });
};

// 삭제
export const deleteReview = async (id: number) => {
  const data = await apiClient.request(DELETE_REVIEW, {
    body: {
      id,
    },
  });
  return data;
};

// 삭제
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

// 생성
export const createReview = async (body: any): Promise<any> => {
  const response = await apiClient.request(CREATE_REVIEW_API, {
    body,
  });
  return response;
};


export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables?.placeId] });
    },
    onError: (error) => {
      console.error('리뷰 작성 실패', error);
    },

  });
};


