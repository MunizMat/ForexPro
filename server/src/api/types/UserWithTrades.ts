import { User, Trade } from '@prisma/client';

export type UserWithTrades = User & {
  trades: Trade[];
};
