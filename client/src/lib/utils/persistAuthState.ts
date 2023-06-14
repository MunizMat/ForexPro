import { IAuthState } from '../interfaces/IAuthState';

const persistAuthState = ({ isAuthenticated, token, user }: IAuthState) => {
  if (isAuthenticated) {
    localStorage.setItem('token', token || '');
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default persistAuthState;
