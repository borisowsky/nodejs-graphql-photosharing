import { AuthenticationError } from 'apollo-server';

import { User } from '@app/db/entities';
import { QueryResolvers } from '@app/types/resolvers';

import { getAuthenticatedUserObject } from '../errors/authentication';

export const me: QueryResolvers['me'] = async (
  _root,
  _args,
  { userCredentials },
) => {
  try {
    const user = await User.findOneOrFail({
      where: { id: userCredentials.id },
    });

    return getAuthenticatedUserObject(user);
  } catch (e) {
    throw new AuthenticationError('Cannot authenticate');
  }
};
