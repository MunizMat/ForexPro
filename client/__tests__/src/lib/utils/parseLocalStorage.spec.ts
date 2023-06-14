import parseLocalStorage from '../../../../src/lib/utils/parseLocalStorage';

describe('parseLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null user and token when localStorage is empty', () => {
    const result = parseLocalStorage();

    expect(result.user).toBeNull();
    expect(result.token).toBeNull();
  });

  it('should return the parsed user and token from localStorage', () => {
    const user = { id: 1, name: 'John Doe' };
    const token = 'myToken';

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    const result = parseLocalStorage();

    expect(result.user).toEqual(user);
    expect(result.token).toBe(token);
  });
});
