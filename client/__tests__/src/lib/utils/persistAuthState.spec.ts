import { IAuthState } from 'src/lib/interfaces/IAuthState';
import persistAuthState from '../../../../src/lib/utils/persistAuthState';

describe('persistAuthState', () => {
  beforeEach(() => {
    // Reset localStorage before each test
    localStorage.clear();
  });

  it('should persist authentication state when isAuthenticated is true', () => {
    const authState = {
      isAuthenticated: true,
      token: 'myToken',
      user: { id: 1, name: 'John Doe' },
    } as IAuthState;

    persistAuthState(authState);

    expect(localStorage.getItem('token')).toBe('myToken');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(authState.user));
  });

  it('should remove authentication state when isAuthenticated is false', () => {
    localStorage.setItem('token', 'myToken');
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'John Doe' }));

    const authState = {
      isAuthenticated: false,
      token: '',
      user: null,
    };

    persistAuthState(authState);

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
