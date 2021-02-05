import { execSync } from 'child_process';

import { createTestClient } from 'apollo-server-testing';

import { PrismaClient } from '@prisma/client';

import { createServer } from '@app/utils/server';

const prisma = new PrismaClient();

export const { query, mutate } = createTestClient(createServer({ prisma }));

beforeAll(() => {
  process.env.DATABASE_URL = 'file:./test.db';

  execSync('yarn prisma db push --preview-feature', { env: process.env });
});

afterEach(() => {
  execSync('yarn prisma migrate reset --force --preview-feature', {
    env: process.env,
  });
});

afterAll(() => {
  prisma.$disconnect();
});
