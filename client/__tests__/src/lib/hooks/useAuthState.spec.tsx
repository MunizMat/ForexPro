import { act, renderHook } from '@testing-library/react';
import { useAuthState } from '../../../../src/lib/hooks/useAuthState';
import { IAuthState } from '../../../../src/lib/interfaces/IAuthState';
import parseLocalStorage from '../../../../src/lib/utils/parseLocalStorage';
import persistAuthState from '../../../../src/lib/utils/persistAuthState';

jest.mock('../../../../src/lib/utils/parseLocalStorage');
jest.mock('../../../../src/lib/utils/persistAuthState');

describe('useAuthState hook', () => {
  it('should change auth state', () => {
    const mockInicialAuthState = {
      isAuthenticated: false,
      user: null,
      token: null,
    };

    const mockUpdatedAuthState = {
      isAuthenticated: true,
      user: {
        id: 1,
      },
      token: 'mockToken',
    } as IAuthState;
    (parseLocalStorage as jest.Mock).mockReturnValue(mockInicialAuthState);
    const { result } = renderHook(() => useAuthState());
    expect(result.current.authState).toEqual(mockInicialAuthState);

    act(() => {
      result.current.setAuthState(mockUpdatedAuthState);
    });

    expect(result.current.authState).toEqual(mockUpdatedAuthState);
    expect(persistAuthState).toHaveBeenCalledWith(mockUpdatedAuthState);
  });
});
