import { Trade, User } from '@prisma/client';

export type TradeCreationRequest = {
  user: User;
  newTrade: Omit<Trade, 'id' | 'createdAt'>;
};
