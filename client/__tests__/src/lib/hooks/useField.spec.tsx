import { renderHook } from '@testing-library/react';
import useField from '../../../../src/lib/hooks/useField';
import { ChangeEvent } from 'react';
import { act } from 'react-dom/test-utils';

describe('useField hook', () => {
  it('should handle input changes', () => {
    const { result } = renderHook(() => useField());
    const event = {
      target: { value: 'new value' },
    } as unknown as ChangeEvent<HTMLInputElement>;

    expect(result.current.value).toBe('');

    act(() => {
      result.current.onChange(event);
    });

    expect(result.current.value).toBe('new value');
  });
});
