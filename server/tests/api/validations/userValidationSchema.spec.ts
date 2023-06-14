import { z } from 'zod';

const validationSchema = z.object({
  name: z.string().nonempty({ message: 'Please enter your name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*\d).*$/, {
      message:
        'Password must contain at least one capital letter and one number',
    })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(30, { message: 'Password must not exceed 30 characters' }),
});

describe('Validation Schema', () => {
  it('should validate a valid input object', () => {
    const validInput = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123',
    };

    expect(() => validationSchema.parse(validInput)).not.toThrow();
  });

  it('should throw an error for missing name', () => {
    const input = {
      name: '',
      email: 'john@example.com',
      password: 'Password123',
    };

    expect(() => validationSchema.parse(input)).toThrowError(
      'Please enter your name',
    );
  });

  it('should throw an error for invalid email', () => {
    const input = {
      name: 'John Doe',
      email: 'invalid-email',
      password: 'Password123',
    };

    expect(() => validationSchema.parse(input)).toThrowError(
      'Please enter a valid email address',
    );
  });

  it('should throw an error for weak password', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'weak',
    };

    expect(() => validationSchema.parse(input)).toThrowError(
      'Password must contain at least one capital letter and one number',
    );
  });

  it('should throw an error for short password', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'pass',
    };

    expect(() => validationSchema.parse(input)).toThrowError(
      'Password must be at least 6 characters long',
    );
  });

  it('should throw an error for long password', () => {
    const input = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'a'.repeat(31),
    };

    expect(() => validationSchema.parse(input)).toThrowError(
      'Password must not exceed 30 characters',
    );
  });
});
