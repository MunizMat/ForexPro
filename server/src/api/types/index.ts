export interface DynamoItem {
  partition_key: string;
  sort_key: string;
  datatype: string;
  createdAt: string;
}

export interface Trade {
  trade_id: string;
  currencyPair: string;
  amount: number;
  exchangeRate: number;
  baseCurrency: string;
  tradeType: string;
}

export interface User {
  user_id: string;
  name: string;
  email: string;
  accountBalanceGBP: number;
  accountBalanceUSD: number;
  trades?: Trade[];
}
