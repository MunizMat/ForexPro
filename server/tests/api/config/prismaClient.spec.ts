import { PrismaClient } from '@prisma/client';
import prismaClient from '../../../src/api/config/prismaClient';

describe('Prisma Client instance', () => {
  it('should be an instance of PrismaClient', () => {
    expect(prismaClient).toBeInstanceOf(PrismaClient);
  });
});
