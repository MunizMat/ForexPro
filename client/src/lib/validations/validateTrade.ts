import { ZodError } from 'zod';
import { toast } from 'react-toastify';
import { IDictionary } from '../interfaces/IDictionary';
import getTradeSchema from './tradeSchema';

const validateTrade = (
  tradeAmount: string,
  accountBalance: number,
  dict: IDictionary
) => {
  const amount = parseFloat(tradeAmount);
  if (!amount) {
    toast.error(dict.validations.trade.required);
    return false;
  }

  try {
    getTradeSchema(dict).parse({ amount, accountBalance });
    return true;
  } catch (error: unknown) {
    if (error instanceof ZodError)
      error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
    return false;
  }
};

export default validateTrade;
