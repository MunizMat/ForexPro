import { ITrade } from 'src/lib/interfaces/ITrade';
import TradeHistory from '../../../../src/lib/utils/TradeHistory';

describe('TradeHistory utility class', () => {
  const trade1 = {
    id: 1,
    amount: 200,
    baseCurrency: 'GBP',
    createdAt: new Date('2023-06-06T12:34:56Z') as unknown as string,
    currencyPair: 'GBPUSD',
    exchangeRate: 2,
    tradeType: 'Buy' as 'Buy',
    userId: 2,
  };

  const trade2 = {
    id: 1,
    amount: 200,
    baseCurrency: 'GBP',
    createdAt: new Date('2023-06-06T12:34:56Z') as unknown as string,
    currencyPair: 'GBPUSD',
    exchangeRate: 2,
    tradeType: 'Buy' as 'Buy',
    userId: 2,
  };

  const mockTrades: ITrade[] = [trade1, trade2];

  test('trades should be defined', () => {
    const tradeHistory = new TradeHistory(mockTrades);
    expect(tradeHistory.trades).toBeDefined();
  });

  test('formatDate method for en-US', () => {
    const tradeHistory = new TradeHistory(mockTrades);
    const expectedResult = [
      { ...trade1, createdAt: '6/6/2023, 12:34:56 PM (UTC)' },
      { ...trade2, createdAt: '6/6/2023, 12:34:56 PM (UTC)' },
    ];
    const formatedDates = tradeHistory.formatDate('en-US', 'UTC');

    expect(formatedDates).toEqual({ trades: expectedResult });
  });

  test('formatDate method for pt-BR', () => {
    const tradeHistory = new TradeHistory(mockTrades);
    const expectedResult = [
      { ...trade1, createdAt: '06/06/2023 09:34:56 (Horário de Brasília)' },
      { ...trade2, createdAt: '06/06/2023 09:34:56 (Horário de Brasília)' },
    ];
    const formatedDates = tradeHistory.formatDate(
      'pt-BR',
      'Horário de Brasília'
    );

    expect(formatedDates).toEqual({ trades: expectedResult });
  });
});
