import { IUser } from 'src/lib/interfaces/IUser';
import saveTrade, {
  TradeResponse,
} from '../../../../src/lib/services/tradeService';
import { toast } from 'react-toastify';
import api from '../../../../src/lib/config/axios';
import { ITradeCreation } from 'src/lib/interfaces/ITrade';
import { AxiosRequestConfig } from 'axios';
import { IDictionary } from 'src/lib/interfaces/IDictionary';

jest.mock('../../../../src/lib/config/axios');
jest.mock('react-toastify');

describe('tradeService', () => {
  const mockResponse = {
    data: {
      user: {
        id: 1,
        name: 'John',
      } as IUser,
    },
  } as unknown as TradeResponse;

  const mockDict = {
    toasts: {
      pending: {
        trade: '',
      },
      success: {
        trade: '',
      },
      error: {
        trade: '',
      },
    },
  } as IDictionary;

  const mockUser = {
    id: 1,
    name: 'John doe',
    email: 'johndoes@example.com',
    password: 'Password123',
  } as IUser;

  const mockToken = 'mockToken';

  const mockTrade = {} as ITradeCreation;

  const mockBody = { user: mockUser, newTrade: mockTrade };

  const mockAxiosConfig = {
    headers: {
      Authorization: 'Bearer mockToken',
    },
  } as AxiosRequestConfig;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call toast.promise', async () => {
    const toastSpy = jest.spyOn(toast, 'promise');
    const apiSpy = jest.spyOn(api, 'post');
    await saveTrade(mockUser, mockToken, mockTrade, mockDict);

    expect(apiSpy).toHaveBeenCalledWith(
      '/users/1/trade',
      mockBody,
      mockAxiosConfig
    );
    expect(toastSpy).toHaveBeenCalled();
  });

  it('should return correct data', async () => {
    const expectedResult = {
      user: {
        id: 1,
        name: 'John',
      },
    };
    jest.spyOn(toast, 'promise').mockResolvedValue(mockResponse);
    const result = await saveTrade(mockUser, mockToken, mockTrade, mockDict);
    expect(result).toEqual(expectedResult);
  });
});
