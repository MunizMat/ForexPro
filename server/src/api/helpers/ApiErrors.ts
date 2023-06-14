import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ZodIssue } from 'zod';

export type TranslationReference =
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

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly translationReference: TranslationReference;

  constructor(translationReference: TranslationReference, statusCode: number) {
    super(translationReference);
    this.statusCode = statusCode;
    this.translationReference = translationReference;
  }

  static handle(error: unknown) {
    if ((error as PrismaClientKnownRequestError).code === 'P2002') {
      // Prisma Error
      return new ApiError('accountAlreadyExists', 422);
    }
    if (error instanceof ApiError) return error;
    return new ApiError('requestProcessing', 500);
  }
}

export class BadRequestError extends ApiError {
  constructor(translationReference: TranslationReference) {
    super(translationReference, 400);
  }
}
export class NotFoundError extends ApiError {
  constructor(translationReference: TranslationReference) {
    super(translationReference, 404);
  }
}
export class UnauthorizedError extends ApiError {
  constructor(translationReference: TranslationReference) {
    super(translationReference, 401);
  }
}
export class ZodValidationError extends ApiError {
  public errors: ZodIssue[];
  constructor(translationReference: TranslationReference, errors: ZodIssue[]) {
    super(translationReference, 422);
    this.errors = errors;
  }
}
