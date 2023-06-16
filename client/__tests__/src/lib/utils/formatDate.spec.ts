import formatDate from '../../../../src/lib/utils/formatDate';

describe('formatDate utility function', () => {
  it('should format a date for pt-BR', () => {
    const date = new Date('2023-06-06T12:34:56Z');
    const dateSpy = jest.spyOn(date, 'toLocaleString');

    formatDate(date, 'pt-BR', 'Horário de Brasília');

    expect(dateSpy).toHaveBeenCalledWith('pt-BR', {});
  });
  it('should format a date for en-US', () => {
    const date = new Date('2023-06-06T12:34:56Z');
    const dateSpy = jest.spyOn(date, 'toLocaleString');

    const formattedDate = formatDate(date, 'en-US', 'UTC');

    expect(dateSpy).toHaveBeenCalledWith('en-US', { timeZone: 'UTC' });
    expect(formattedDate).toBe('6/6/2023, 12:34:56 PM (UTC)');
  });
});
