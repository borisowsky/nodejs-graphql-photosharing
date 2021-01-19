import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

import { typeDefs } from '@app/graphql';
import { resolvers as queryResolvers } from '@app/graphql/queries';
import { resolvers as mutationResolvers } from '@app/graphql/mutations';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: queryResolvers,
    Mutation: mutationResolvers,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
