import { Command } from '@/lib/apis/apiClient';

/**
 * Auth (회원가입, 로그아웃, 로그인) API
 */
export const SIGNIN_API: Command = {
  path: '/auth/login',
  method: 'POST',
};

export const SIGNOUT_API: Command = {
  path: '/auth/signout',
  method: 'DELETE',
};

export const LOGOUT_API: Command = {
  path: '/auth/logout',
  method: 'GET',
};

// 문자인증
export const requestAuthCodePhoneNumber: Command = {
  path: '/auth/sms/request',
  method: 'POST',
};

export const verifyAuthCodePhoneNumber: Command = {
  path: '/auth/sms/verify',
  method: 'POST',
};
/**
 * User(유저) API
 */
export const GET_USER_PROFILE: Command = {
  path: '/users/profile',
  method: 'GET',
};

/**
 * Place(장소) API
 */
export const GET_PLACE_API: Command = {
  path: '/places',
  method: 'GET',
};

export const CREATE_PLACE_API: Command = {
  path: '/places',
  method: 'POST',
};
export const DELETE_PALCE_API: Command = {
  path: '/places',
  method: 'DELETE',
};

/**
 * Review(리뷰) API
 */
export const CREATE_REVIEW_API: Command = {
  path: '/reviews',
  method: 'POST',
};

export const DELETE_REVIEW: Command = {
  path: '/reviews',
  method: 'DELETE',
};

export const GET_REVIEW_API: Command = {
  path: '/reviews',
  method: 'GET',
};
