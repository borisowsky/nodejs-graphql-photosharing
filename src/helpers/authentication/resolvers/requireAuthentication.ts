import { AuthenticationError } from 'apollo-server';

import { ServerContext } from '@app/types/global';

export const requireAuthentication = async (ctx: ServerContext) => {
  if (!ctx.userCredentials) {
    throw new AuthenticationError('Not authenticated');
  }

  try {
    await ctx.prisma.user.findUnique({
      where: { id: Number(ctx.userCredentials.id) },
    });
  } catch {
    throw new AuthenticationError('Wrong credentials');
  }

  return ctx;
};
