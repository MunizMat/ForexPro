export interface ITrade {
  id: number;
  userId: number;
  currencyPair: string;
  baseCurrency: string;
  tradeType: string;
  amount: number;
  exchangeRate: number;
  createdAt: string;
}

export type ITradeCreation = Omit<ITrade, 'id' | 'createdAt' | 'userId'>;
