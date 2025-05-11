import { GET_REVIEW_API, GET_USER_PROFILE } from '@/lib/apis/command';
import apiClient from '@/lib/apis/apiClient';
import { useQuery } from '@tanstack/react-query';

interface UserResult {

}

interface UserResponse {
  result: UserResult;
}

export const getUserProfile = async (): Promise<UserResponse> => {
  const result = await apiClient.request(GET_USER_PROFILE);
  return result as UserResponse;
};

// 유저 프로필 조회
export const useUserProfile = () => {
  return useQuery<UserResponse>({
    queryKey: ['user', 'profile'],
    queryFn: () => getUserProfile(),
  });
};
