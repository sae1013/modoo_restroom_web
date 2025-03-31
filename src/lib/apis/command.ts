import { Command } from '@/lib/apis/apiClient';

export const SIGNOUT_API: Command = {
  path: '/auth/signout',
  method: 'DELETE',
};

export const LOGOUT_API: Command = {
  path: '/user/logout',
  method: 'POST',
};

