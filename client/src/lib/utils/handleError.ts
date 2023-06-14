import { AxiosError } from 'axios';

type TranslationReference =
  | 'axiosNetwork'
  | 'default'
  | 'accountAlreadyExists'
  | 'wrongPassword'
  | 'requestProcessing'
  | 'zodValidation'
  | 'userDoesntExist'
  | 'failToGetUserData'
  | 'loginRequired'
  | 'unauthorized';

export const handleError: (
  // eslint-disable-next-line no-unused-vars
  error: unknown
) => TranslationReference = (error) => {
  if (error instanceof AxiosError)
    return error.response?.data.errorTranslationMessage;
  return 'default';
};
