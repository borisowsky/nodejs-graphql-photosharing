import bcrypt from 'bcrypt';
import * as yup from 'yup';

import { ApolloError, AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

import { MutationResolvers } from '@app/types/resolvers';
import { groupYupErrors } from '@app/graphql/errors/helpers';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).required(),
});

export const login: MutationResolvers['login'] = async (
  _root,
  { input },
  { prisma },
) => {
  try {
    await schema.validate(input, { abortEarly: false });
  } catch (e) {
    const errors = groupYupErrors(e);

    throw new ApolloError(e.message, null, {
      errors,
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });

    const isPasswordsEqual = await bcrypt.compare(
      input.password,
      user.password,
    );

    if (!isPasswordsEqual) {
      throw new AuthenticationError('Wrong credentials');
    }

    return {
      ...user,
      token: jwt.sign(user, process.env.JWT_SECRET),
    };
  } catch {
    throw new AuthenticationError('Wrong credentials');
  }
};
