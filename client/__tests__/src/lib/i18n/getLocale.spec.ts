import { NextRequest } from 'next/server';
import { getLocale } from '../../../../src/lib/i18n/getLocale';

describe('getLocale function', () => {
  it('should get preferred en-US locale', () => {
    const mockRequest = {
      headers: new Map([
        ['accept-language', 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7'],
      ]),
    } as unknown as NextRequest;
    const locale = getLocale(mockRequest);

    expect(locale).toBe('en-US');
  });

  it('should get preferred pt-BR locale', () => {
    const mockRequest = {
      headers: new Map([
        ['accept-language', 'pt-BR,en;q=0.9,fr-FR;q=0.8,fr;q=0.7'],
      ]),
    } as unknown as NextRequest;
    const locale = getLocale(mockRequest);

    expect(locale).toBe('pt-BR');
  });

  it('should fallback to default locale (en-US)', () => {
    const mockRequest = {
      headers: new Map([['accept-language', 'fr-FR;q=0.8,fr;q=0.7']]),
    } as unknown as NextRequest;
    const locale = getLocale(mockRequest);

    expect(locale).toBe('en-US');
  });
});
