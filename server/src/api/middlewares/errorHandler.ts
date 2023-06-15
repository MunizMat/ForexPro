import { Request, Response } from 'express';
import { ApiError } from '../helpers/ApiErrors';

const errorHandler = (
  error: Partial<Error & ApiError>,
  req: Request,
  res: Response,
) => {
  const statusCode = error.statusCode ?? 500;
  const errorTranslationReference = error.translationReference
    ? error.translationReference
    : 'default';
  console.log(statusCode, errorTranslationReference);
  return res.status(statusCode).json({ errorTranslationReference });
};

export default errorHandler;
