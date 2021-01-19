import { QueryResolvers } from '@app/types/resolvers';

export const user: QueryResolvers['user'] = async (_root, args, { prisma }) => {
  return await prisma.user.findUnique({ where: { id: Number(args.id) } });
};
