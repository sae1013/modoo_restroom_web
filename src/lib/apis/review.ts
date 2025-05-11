import apiClient from '@/lib/apis/apiClient';
import { CREATE_REVIEW_API, DELETE_REVIEW, GET_REVIEW_API } from '@/lib/apis/command';
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
export const fetchReviewsByPlaceId = async (placeId: number): Promise<ReviewsResponse> => {
  const result = await apiClient.request(GET_REVIEW_API, {
    queryParams: {
      placeId,
    },
  });
  return result as ReviewsResponse;
};

// 건물아이디로 조회
export const useReviews = (placeId: number) => {
  return useQuery<ReviewsResponse>({
    queryKey: ['place', placeId, 'reviews'],
    queryFn: () => fetchReviewsByPlaceId(placeId),
  });
};

// 유저정보로 리뷰 조회
export const fetchReviewsByUserId = async (): Promise<ReviewsResponse> => {
  const result = await apiClient.request(GET_REVIEW_API);
  return result as ReviewsResponse;
};

export const useReviewsByUser = () => {
  return useQuery<ReviewsResponse>({
    queryKey: ['user', 'reviews'],
    queryFn: () => fetchReviewsByUserId(),
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
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess: () => {
      // 관련된 모든 리뷰 쿼리들 무효화
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey as string[];
          return (
            (queryKey[0] === 'place' && queryKey[2] === 'reviews') || // 장소별 리뷰
            (queryKey[0] === 'user' && queryKey[1] === 'reviews') // 유저의 리뷰
          );
        },
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
      // 관련된 모든 리뷰 쿼리들 무효화
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey as string[];
          return (
            (queryKey[0] === 'place' && queryKey[1] === variables.placeId && queryKey[2] === 'reviews') || // 특정 장소의 리뷰
            (queryKey[0] === 'user' && queryKey[1] === 'reviews') // 유저의 리뷰

          );
        },
      });
    },
    onError: (error) => {
      console.error('리뷰 작성 실패', error);
    },
  });
};
