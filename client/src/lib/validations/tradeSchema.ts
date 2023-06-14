import { z } from 'zod';
import { IDictionary } from '../interfaces/IDictionary';

export default function getTradeSchema(dict: IDictionary) {
  const tradeSchema = z
    .object({
      amount: z.number().min(10, {
        message: dict.validations.trade.amount,
      }),

      accountBalance: z.number(),
    })
    .refine(
      (schema) => {
        return schema.amount < schema.accountBalance;
      },
      {
        message: dict.validations.trade.accountBalance,
        path: ['amount'],
      }
    );

  return tradeSchema;
}
