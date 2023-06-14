import { IUser } from '../interfaces/IUser';

const parseLocalStorage = () => {
  if (typeof window === 'undefined') return { user: null, token: null };
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user: IUser | null = userJson ? JSON.parse(userJson) : null;
  return { user, token };
};

export default parseLocalStorage;
