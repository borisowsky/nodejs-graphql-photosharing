import { ApolloServer } from 'apollo-server';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import dotenv from 'dotenv';

import { typeDefs } from '@app/graphql';
import { resolvers as queryResolvers } from '@app/graphql/queries';
import { resolvers as mutationResolvers } from '@app/graphql/mutations';
import { getCredentialsFromToken } from '@app/helpers/authentication';
import type { ServerContext } from '@app/types/global';

dotenv.config();

const defaultContext: ApolloServerExpressConfig['context'] = ({ req }) => {
  const { authorization } = req.headers;

  const context: ServerContext = {
    userCredentials: null,
  };

  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    context.userCredentials = getCredentialsFromToken(token);
  }

  return context;
};

export const createServer = (context = defaultContext) => {
  return new ApolloServer({
    typeDefs,
    resolvers: {
      Query: queryResolvers,
      Mutation: mutationResolvers,
    },
    context,
  });
};
