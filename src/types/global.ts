import { PrismaClient } from '@prisma/client';

export interface ServerContext {
  prisma: PrismaClient;
  userCredentials?: Record<string, string | number>;
}
