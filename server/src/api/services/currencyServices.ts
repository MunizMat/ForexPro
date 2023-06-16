import dotenv from 'dotenv';
dotenv.config();
import MetaApi, { StreamingMetaApiConnectionInstance } from 'metaapi.cloud-sdk';

export default class CurrencyServices {
  public accountId: string;
  public token: string;
  public static connection: StreamingMetaApiConnectionInstance;

  private constructor(accountId: string, token: string) {
    this.accountId = accountId;
    this.token = token;
  }

  static async init() {
    if (!CurrencyServices.connection) {
      const accountId = process.env.META_API_ACCOUNT_ID ?? '';
      const token = process.env.META_API_TOKEN ?? '';
      CurrencyServices.connection = await CurrencyServices.getMetaApiConnection(
        accountId,
        token,
      );
    }
  }

  static async getMetaApiConnection(accountId: string, token: string) {
    const api = new MetaApi(token);
    const account = await api.metatraderAccountApi.getAccount(accountId);
    const connection = account.getStreamingConnection();
    await connection.connect();
    await connection.waitSynchronized({});
    await connection.subscribeToMarketData('GBPUSD', []);

    return connection;
  }

  static getRates(currencyPair: string) {
    const terminalState = CurrencyServices.connection.terminalState;

    const { ask, bid, time, symbol } = terminalState.price(currencyPair);
    return {
      askPrice: ask,
      bidPrice: bid,
      updatedAt: time,
      symbol,
    };
  }
}
