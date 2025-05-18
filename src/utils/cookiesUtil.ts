import Cookies from 'js-cookie';

export const logoutCookie = () => {
  Cookies.remove('access_token');
};


