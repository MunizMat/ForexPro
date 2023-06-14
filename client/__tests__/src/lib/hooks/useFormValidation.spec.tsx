import { act, renderHook } from '@testing-library/react';
import useFormValidation from '../../../../src/lib/hooks/useFormValidation';
import mockDict from '../../../../mocks/dict';
import getLoginSchema from '../../../../src/lib/validations/loginSchema';
import { ZodTypeAny } from 'zod';

describe('useFormValidation hook', () => {
  it('should have expected initial state', () => {
    const { result } = renderHook(() =>
      useFormValidation(mockDict, getLoginSchema)
    );

    expect(result.current.errors).toEqual({});
  });

  it('should validate valid form data', () => {
    const mockFormFields = {
      email: 'test@example.com' as unknown as ZodTypeAny,
      password: 'Password123' as unknown as ZodTypeAny,
    };

    const { result } = renderHook(() =>
      useFormValidation(mockDict, getLoginSchema)
    );

    act(() => {
      const validationSuccess = result.current.validateForm(mockFormFields);
      expect(validationSuccess).toBe(true);
    });
  });

  it('should validate invalid form data', () => {
    const mockFormFields = {
      email: 'invalid-email' as unknown as ZodTypeAny,
      password: 'Password123' as unknown as ZodTypeAny,
    };

    const { result } = renderHook(() =>
      useFormValidation(mockDict, getLoginSchema)
    );

    act(() => {
      const validationSuccess = result.current.validateForm(mockFormFields);
      expect(validationSuccess).toBe(false);
    });

    expect(result.current.errors).toEqual({
      email: 'Please enter a valid email address',
    });
  });
});
