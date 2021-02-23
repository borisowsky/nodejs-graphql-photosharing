import { User } from '@app/db/entities';

export const getAuthenticatedUserObject = (user: User) => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt.toISOString(),
  token: User.generateToken({ id: user.id, email: user.email }),
});
