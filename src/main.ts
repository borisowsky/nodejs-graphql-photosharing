import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';

import { PrismaClient } from '@prisma/client';

import { typeDefs } from '@app/graphql';

import { resolvers as queryResolvers } from '@app/graphql/queries';
import { resolvers as mutationResolvers } from '@app/graphql/mutations';

import type { ServerContext } from '@app/types/global';

import { getCredentialsFromToken } from '@app/helpers/authentication';

// Load from .env by default.
dotenv.config();

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: queryResolvers,
    Mutation: mutationResolvers,
  },
  context: ({ req }) => {
    const { authorization } = req.headers;

    const context: ServerContext = {
      prisma,
      userCredentials: null,
    };

    if (authorization) {
      const token = authorization.replace('Bearer ', '');

      context.userCredentials = getCredentialsFromToken(token);
    }

    return context;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
