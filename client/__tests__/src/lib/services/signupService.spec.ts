import { IUser, IUserCreation } from 'src/lib/interfaces/IUser';
import signupService, {
  SignupResponse,
} from '../../../../src/lib/services/signupService';
import { toast } from 'react-toastify';
import api from '../../../../src/lib/config/axios';
import { IDictionary } from 'src/lib/interfaces/IDictionary';

jest.mock('../../../../src/lib/config/axios');
jest.mock('react-toastify');

describe('signupService', () => {
  const mockResponse = {
    data: {
      user: {
        id: 1,
        name: 'John',
      } as IUser,
    },
  } as unknown as SignupResponse;

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

  const mockUserData: IUserCreation = {
    name: 'John doe',
    email: 'johndoes@example.com',
    password: 'Password123',
  };

  it('should call toast.promise', async () => {
    const toastSpy = jest.spyOn(toast, 'promise');
    const apiSpy = jest.spyOn(api, 'post');
    await signupService(mockUserData, mockDict);

    expect(apiSpy).toHaveBeenCalledWith('/users', mockUserData);
    expect(toastSpy).toHaveBeenCalled();
  });

  it('should return correct data', async () => {
    jest.spyOn(toast, 'promise').mockResolvedValue(mockResponse);
    const result = await signupService(mockUserData, mockDict);
    expect(result).toEqual(mockResponse);
  });
});
