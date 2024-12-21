import Cookies from 'js-cookie';

export const setToken = (token) => {
      localStorage.setItem('access_token', token);
};

export const getToken = () => {
      return localStorage.getItem('access_token');
};

export const removeToken = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
};
