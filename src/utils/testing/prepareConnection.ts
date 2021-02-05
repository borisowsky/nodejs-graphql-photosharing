import { execSync } from 'child_process';

import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';

import { PrismaClient } from '@prisma/client';

import { typeDefs } from '@app/graphql';
import { resolvers as queryResolvers } from '@app/graphql/queries';
import { resolvers as mutationResolvers } from '@app/graphql/mutations';

import type { ServerContext } from '@app/types/global';

const prisma = new PrismaClient();

const createServer = () => {
  return createTestClient(
    new ApolloServer({
      typeDefs,
      resolvers: {
        Query: queryResolvers,
        Mutation: mutationResolvers,
      },
      context: {
        prisma,
        userCredentials: null,
      } as ServerContext,
    }),
  );
};

export const { query, mutate } = createServer();

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
