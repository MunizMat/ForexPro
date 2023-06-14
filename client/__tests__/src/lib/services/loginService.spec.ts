import { ILoginCredentials, IUser } from 'src/lib/interfaces/IUser';
import loginService, {
  LoginResponseType,
} from '../../../../src/lib/services/loginService';
import { toast } from 'react-toastify';
import api from '../../../../src/lib/config/axios';
import { IDictionary } from 'src/lib/interfaces/IDictionary';

jest.mock('../../../../src/lib/config/axios');
jest.mock('react-toastify');

describe('loginService', () => {
  const mockLoginResponse = {
    data: {
      user: {
        id: 1,
        name: 'John',
      } as IUser,
      token: 'mockToken',
    },
  } as LoginResponseType;

  const mockCredentials: ILoginCredentials = {
    email: 'johndoes@example.com',
    password: 'Password13',
  };

  const mockDict = {
    toasts: {
      pending: {
        login: '',
      },
      success: {
        login: '',
      },
    },
  } as IDictionary;

  it('should call toast.promise', async () => {
    const toastSpy = jest.spyOn(toast, 'promise');
    const apiSpy = jest.spyOn(api, 'post');
    await loginService(mockCredentials, mockDict);

    expect(apiSpy).toHaveBeenCalledWith('/auth', mockCredentials);
    expect(toastSpy).toHaveBeenCalled();
  });

  it('should return correct data', async () => {
    jest.spyOn(toast, 'promise').mockResolvedValue(mockLoginResponse);
    const result = await loginService(mockCredentials, mockDict);
    expect(result).toEqual(mockLoginResponse);
  });
});
