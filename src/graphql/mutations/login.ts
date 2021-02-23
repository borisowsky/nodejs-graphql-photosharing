import { AuthenticationError } from 'apollo-server';

import { User } from '@app/db/entities';
import { MutationResolvers } from '@app/types/resolvers';

export const login: MutationResolvers['login'] = async (_root, { input }) => {
  try {
    return await User.authenticate(input.email, input.password);
  } catch (e) {
    throw new AuthenticationError(e.message);
  }
};
