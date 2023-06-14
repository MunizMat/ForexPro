import { ZodIssue } from 'zod';
import getValidationErrors from '../../../../src/lib/utils/getValidationErrors';

describe('getValidationErrors utility function', () => {
  it('should return an object containing the field and its error message', () => {
    const issuesArray: ZodIssue[] = [
      { path: ['email'], message: 'Invalid email' } as ZodIssue,
      { path: ['password'], message: 'Invalid password' } as ZodIssue,
    ];

    const validationErrors = getValidationErrors(issuesArray);

    expect(validationErrors).toEqual({
      email: 'Invalid email',
      password: 'Invalid password',
    });
  });
});
