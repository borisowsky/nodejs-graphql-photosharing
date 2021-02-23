import { ApolloError } from 'apollo-server';

import { User } from '@app/db/entities';
import { QueryResolvers } from '@app/types/resolvers';

import { getAuthenticatedUserObject } from '../errors/authentication';

export const user: QueryResolvers['user'] = async (_root, { id }) => {
  try {
    const user = await User.findOneOrFail(id);
    const userObject = getAuthenticatedUserObject(user);

    delete userObject.token;

    return userObject;
  } catch {
    throw new ApolloError(`Cannot find user with ID ${id}`);
  }
};
