import { AxiosError, AxiosResponse } from 'axios';
import { handleError } from '../../../../src/lib/utils/handleError';

describe('handleError utility function', () => {
  it('should handle an AxiosError that has a translation reference', () => {
    const mockResponse = {
      data: { errorTranslationMessage: 'loginRequired' },
    } as AxiosResponse;
    const mockError = new AxiosError('', '', undefined, '', mockResponse);

    const result = handleError(mockError);

    expect(result).toBe('loginRequired');
  });

  it('should handle any other error', () => {
    const mockError = new Error('');

    const result = handleError(mockError);

    expect(result).toBe('default');
  });
});
