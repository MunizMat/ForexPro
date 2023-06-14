import { renderHook } from '@testing-library/react';
import useSocket from '../../../../src/lib/hooks/useSocket';
import { io } from 'socket.io-client';
import mockDict from '../../../../mocks/dict';
// eslint-disable-next-line
import { useContext } from 'react';

jest.mock('socket.io-client');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn().mockReturnValue({
    setAuthState: jest.fn(),
    authState: {
      user: {
        id: 1,
      },
    },
  }),
}));

describe('useSocket hook', () => {
  const mockSocketIo = (io as jest.Mock).mockReturnValue({
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
  });

  it('should call socket listeners', () => {
    renderHook(() => useSocket('GBPUSD', mockDict));

    expect(io).toHaveBeenCalledWith('http://localhost:3000');

    expect(mockSocketIo().emit).toHaveBeenCalledWith('userId', 1);
    expect(mockSocketIo().on).toHaveBeenNthCalledWith(
      1,
      'connect',
      expect.any(Function)
    );
    expect(mockSocketIo().on).toHaveBeenNthCalledWith(
      2,
      'tradeCompleted',
      expect.any(Function)
    );
    expect(mockSocketIo().on).toHaveBeenNthCalledWith(
      3,
      'tradeFailed',
      expect.any(Function)
    );
    expect(mockSocketIo().on).toHaveBeenNthCalledWith(
      4,
      'sendRates',
      expect.any(Function)
    );
    expect(mockSocketIo().on).toHaveBeenNthCalledWith(
      5,
      'disconnect',
      expect.any(Function)
    );
  });
});
