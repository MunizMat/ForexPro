import {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ZodValidationError,
} from '../../../src/api/helpers/ApiErrors';
import { ZodIssue } from 'zod';

describe('ApiError', () => {
  describe('handleError', () => {
    it('should return correct api error for existing account', () => {
      const error = { code: 'P2002' };

      const result = ApiError.handle(error);

      expect(result).toBeInstanceOf(ApiError);
      expect(result.translationReference).toBe('accountAlreadyExists');
      expect(result.statusCode).toBe(422);
    });

    it('should return the provided ApiError', () => {
      const error = new ApiError('requestProcessing', 400);

      const result = ApiError.handle(error);

      expect(result).toBeInstanceOf(ApiError);
      expect(result.translationReference).toBe('requestProcessing');
      expect(result.statusCode).toBe(400);
    });

    it('should return default ApiError', () => {
      const unknownError = new Error('Unknown error');

      const result = ApiError.handle(unknownError);

      expect(result).toBeInstanceOf(ApiError);
      expect(result.translationReference).toBe('requestProcessing');
      expect(result.statusCode).toBe(500);
    });
  });
});

describe('BadRequestError', () => {
  it('should have the correct message and status code', () => {
    const error = new BadRequestError('requestProcessing');

    expect(error.translationReference).toBe('requestProcessing');
    expect(error.statusCode).toBe(400);
  });
});

describe('NotFoundError', () => {
  it('should have the correct message and status code', () => {
    const error = new NotFoundError('userDoesntExist');

    expect(error.translationReference).toBe('userDoesntExist');
    expect(error.statusCode).toBe(404);
  });
});

describe('UnauthorizedError', () => {
  it('should have the correct message and status code', () => {
    const error = new UnauthorizedError('unauthorized');

    expect(error.translationReference).toBe('unauthorized');
    expect(error.statusCode).toBe(401);
  });
});

describe('ZodValidationError', () => {
  it('should have the correct message, status code, and errors', () => {
    const errors: ZodIssue[] = [
      { path: ['name'], message: 'Invalid name', code: 'custom' },
      { path: ['email'], message: 'Invalid email', code: 'custom' },
    ];
    const error = new ZodValidationError('zodValidation', errors);

    expect(error.translationReference).toBe('zodValidation');
    expect(error.statusCode).toBe(422);
    expect(error.errors).toEqual(errors);
  });
});
