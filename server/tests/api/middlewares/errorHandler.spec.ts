import { Request, Response } from 'express';
import errorHandler from '../../../src/api/middlewares/errorHandler';
import { TranslationReference } from '../../../src/api/helpers/ApiErrors';

describe('Error Handler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should handle error with status code', () => {
    const error = {
      statusCode: 404,
      translationReference: 'unauthorized' as TranslationReference,
    };

    errorHandler(error, req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      errorTranslationReference: 'unauthorized',
    });
  });

  it('should handle error without status code', () => {
    const error = new Error('Not the default error message');

    errorHandler(error, req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      errorTranslationReference: 'default',
    });
  });
});
