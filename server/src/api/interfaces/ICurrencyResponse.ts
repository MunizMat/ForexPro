export interface ICurrencyResponse {
  accountCurrencyExchangeRate: number;
  symbol: string;
  bid: number;
  ask: number;
  time: string;
  brokerTime: string;
  profitTickValue: number;
  lossTickValue: number;
  timestamps: {
    eventGenerated: string;
    serverProcessingStarted: string;
  };
  equity: number;
}
