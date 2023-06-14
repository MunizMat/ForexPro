// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ZodError } from 'zod';
import getSignupSchema from '../../../../src/lib/validations/signUpSchema';

describe('Signup Validation Schema', () => {
  const mockDict = {
    validations: {
      name: 'Please enter your name',
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
      passwordConfirmation: {
        required: 'Please confirm your password',
        notMatching: 'Passwords must match',
      },
    },
  };

  it('should return validation success if signup data is correct', () => {
    expect.assertions(0);
    const signupData = {
      name: 'John',
      email: 'test@gmail.com',
      password: 'Test123456',
      passwordConfirmation: 'Test123456',
    };
    try {
      getSignupSchema(mockDict).parse(signupData);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  describe('Name validation', () => {
    it('should cause error if field is empty', () => {
      expect.assertions(3);
      const signupData = {
        name: '',
        email: 'test@gmail.com',
        password: 'Test123456',
        passwordConfirmation: 'Test123456',
      };
      try {
        getSignupSchema(mockDict).parse(signupData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe('Please enter your name');
      }
    });
  });

  describe('Email validation', () => {
    it('should cause error if field is empty', () => {
      expect.assertions(3);
      const signupData = {
        name: 'John',
        email: '',
        password: 'Test123456',
        passwordConfirmation: 'Test123456',
      };
      try {
        getSignupSchema(mockDict).parse(signupData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe('Please enter your email address');
      }
    });

    it('should cause error if field is invalid', () => {
      expect.assertions(3);
      const signupData = {
        name: 'John',
        email: 'john',
        password: 'Test123456',
        passwordConfirmation: 'Test123456',
      };
      try {
        getSignupSchema(mockDict).parse(signupData);
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
    it('should cause error if field is empty', () => {
      expect.assertions(3);
      const signupData = {
        name: 'John',
        email: 'john@example.com',
        password: '',
        passwordConfirmation: 'Test123456',
      };
      try {
        getSignupSchema(mockDict).parse(signupData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe('Please enter your password');
      }
    });
    it('should cause error if field is too short', () => {
      expect.assertions(3);
      const signupData = {
        name: 'John',
        email: 'john@example.com',
        password: '123',
        passwordConfirmation: 'Test123456',
      };
      try {
        getSignupSchema(mockDict).parse(signupData);
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
      const signupData = {
        name: 'John',
        email: 'john@example.com',
        password: '01234567890123456789012345678901',
        passwordConfirmation: 'Test123456',
      };
      try {
        getSignupSchema(mockDict).parse(signupData);
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
      const signupData = {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
        passwordConfirmation: 'Test123456',
      };
      try {
        getSignupSchema(mockDict).parse(signupData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe(
          'Password must contain at least one capital letter and one number'
        );
      }
    });
  });

  describe('Password confirmation', () => {
    it('should cause error if field is empty', () => {
      expect.assertions(3);
      const signupData = {
        name: 'John',
        email: 'john@example.com',
        password: 'Password123',
        passwordConfirmation: '',
      };
      try {
        getSignupSchema(mockDict).parse(signupData);
      } catch (error) {
        expect(error).toBeInstanceOf(ZodError);
        expect(error).toHaveProperty('errors');
        expect(error.errors[0].message).toBe('Please confirm your password');
      }
    });
  });

  it('should cause error if passwords dont match', () => {
    expect.assertions(3);
    const signupData = {
      name: 'John',
      email: 'john@example.com',
      password: 'Password123',
      passwordConfirmation: 'password123',
    };
    try {
      getSignupSchema(mockDict).parse(signupData);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
      expect(error).toHaveProperty('errors');
      expect(error.errors[0].message).toBe('Passwords must match');
    }
  });
});
