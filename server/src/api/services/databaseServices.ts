import { Trade, User } from '@prisma/client';
import { IAccountCreation } from '../interfaces/IAccountCreation';
import { INewAccBalances } from '../interfaces/INewAccBalances';
import { ApiError } from '../helpers/ApiErrors';
import { dynamo_document } from '../../clients/dynamo';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';
import { ReturnValue } from '@aws-sdk/client-dynamodb';

config();

const TableName = process.env.DYNAMO_TABLE_NAME;
export default class DatabaseServices {
  static async createUser(user: IAccountCreation, hashedPassword: string) {
    const datatype = 'user';
    const id = randomUUID();
    const key = datatype + '#' + id;
    const Item = {
      ...user,
      password: hashedPassword,
      partition_key: key,
      sort_key: key,
      datatype,
      user_id: id,
      accountBalanceGBP: 5000,
      accountBalanceUSD: 5000,
      createdAt: Date.now(),
    };
    try {
      await dynamo_document.put({
        TableName,
        Item,
      });

      return Item;
    } catch (error) {
      console.log(error);
      throw ApiError.handle(error);
    }
  }

  static async getUser(id: string) {
    const { Items: data } = await dynamo_document.query({
      TableName,
      KeyConditionExpression: 'partition_key = :partition_key',
      ExpressionAttributeValues: {
        ':partition_key': `user#${id}`,
      },
    });

    if (!data || !data.length) throw new Error('User not found');

    const user = data.find(({ datatype }) => datatype === 'user');

    if (!user) throw new Error('User not found');

    user.trades = data.filter(({ datatype }) => datatype === 'trade');

    return user;
  }

  static async getUserAndTradeHistory(email: string) {
    const { Items } = await dynamo_document.query({
      TableName,
      IndexName: 'email_index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    });

    if (!Items || !Items?.length) throw new Error('User does not exist');

    const user = await this.getUser(Items[0].user_id);

    return user;
  }

  static async updateUserBalanceAndAddTrade(
    user: User,
    { accountBalanceGBP, accountBalanceUSD }: INewAccBalances,
    trade: Omit<Trade, 'id' | 'createdAt'>,
  ) {
    const id = randomUUID();
    const Item = {
      ...trade,
      partition_key: `user#${user.user_id}`,
      sort_key: `trade#${id}`,
      datatype: 'trade',
      trade_id: id,
      createdAt: Date.now(),
    };

    await Promise.all([
      dynamo_document.put({
        TableName,
        Item,
      }),
      dynamo_document.update({
        Key: {
          partition_key: `user#${user.user_id}`,
          sort_key: `user#${user.user_id}`,
        },
        TableName,
        UpdateExpression:
          'set accountBalanceGBP = :accountBalanceGBP, accountBalanceUSD = :accountBalanceUSD',
        ExpressionAttributeValues: {
          ':accountBalanceGBP': accountBalanceGBP,
          ':accountBalanceUSD': accountBalanceUSD,
        },
        ReturnValues: ReturnValue.ALL_NEW,
      }),
    ]);

    return await this.getUser(user.user_id);
  }
}
