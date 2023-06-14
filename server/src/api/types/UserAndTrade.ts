import { Trade, User } from '@prisma/client';

export type UserAndTrade = {
  updatedUser: User & {
    trades: Trade[];
  };
  newTrade: Omit<Trade, 'id' | 'createdAt'>;
};
