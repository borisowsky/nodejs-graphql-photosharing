import jwt from 'jsonwebtoken';

export const getCredentialsFromToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET) as Record<
      string,
      string | number
    >;
  } catch {
    return null;
  }
};
