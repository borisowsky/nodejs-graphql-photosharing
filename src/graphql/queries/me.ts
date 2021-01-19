import jwt from 'jsonwebtoken';

import { QueryResolvers } from '@app/types/resolvers';
import { requireAuthentication } from '@app/helpers/authentication/resolvers';

export const me: QueryResolvers['me'] = async (
  _root,
  _args,
  { prisma, userCredentials },
) => {
  await requireAuthentication({ prisma, userCredentials });

  const user = await prisma.user.findUnique({
    where: { id: Number(userCredentials.id) },
  });

  return {
    ...user,
    token: jwt.sign(user, process.env.JWT_SECRET),
  };
};
