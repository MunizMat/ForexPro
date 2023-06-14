// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ZodError } from 'zod';
import getLoginSchema from '../../../../src/lib/validations/loginSchema';

describe('Login Validation Schema', () => {
  const mockDict = {
    validations: {
      email: {
        required: 'Please enter your email address',
        invalid: 'Please enter a valid email address',
      },
      password: {
        required: 'Please enter your password',
        tooShort: 'Password must be at least 6 characters long',
        tooLong: 'Password must not exceed 30 characters',
        invalid:
          'Password must contain at least one capital letter and one number',
      },
    },
  };

  it('should return validation success if login data is correct', () => {
    const loginData = { email: 'test@gmail.com', password: 'Test123456' };
    const result = getLoginSchema(mockDict).safeParse(loginData);
    expect(result.success).toBe(true);
    expect(result).toHaveProperty('data');
  });

  describe('Email validation', () => {
    it('should cause error if field is empty', () => {
      expect.assertions(3);
      const loginData = { email: '', password: 'Test123456' };
      try {
        getLoginSchema(mockDict).parse(loginData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe('Please enter your email address');
      }
    });
    it('should cause error if field is invalid', () => {
      expect.assertions(3);
      const loginData = { email: 'john', password: 'Test123456' };
      try {
        getLoginSchema(mockDict).parse(loginData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe(
          'Please enter a valid email address'
        );
      }
    });
  });

  describe('Password validation', () => {
    it('should cause error if field is too short', () => {
      expect.assertions(3);
      const loginData = { email: 'john@example.com', password: '1234' };
      try {
        getLoginSchema(mockDict).parse(loginData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe(
          'Password must be at least 6 characters long'
        );
      }
    });
    it('should cause error if field is too big', () => {
      expect.assertions(3);
      const loginData = {
        email: 'john@example.com',
        password: '01234567890123456789012345678901',
      };
      try {
        getLoginSchema(mockDict).parse(loginData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe(
          'Password must not exceed 30 characters'
        );
      }
    });
    it('should cause error if field does not match requirements', () => {
      expect.assertions(3);
      const loginData = {
        email: 'john@example.com',
        password: 'password123',
      };
      try {
        getLoginSchema(mockDict).parse(loginData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe(
          'Password must contain at least one capital letter and one number'
        );
      }
    });
  });
});
