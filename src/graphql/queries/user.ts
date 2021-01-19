import { ApolloError } from 'apollo-server';

import { QueryResolvers } from '@app/types/resolvers';

export const user: QueryResolvers['user'] = async (_root, args, { prisma }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(args.id) },
    });

    return user;
  } catch {
    throw new ApolloError(`Cannot find user with ID=${args.id}`);
  }
};
