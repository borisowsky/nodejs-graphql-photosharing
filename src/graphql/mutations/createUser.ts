import bcrypt from 'bcrypt';
import * as yup from 'yup';

import { ApolloError } from 'apollo-server';
import jwt from 'jsonwebtoken';

import { MutationResolvers } from '@app/types/resolvers';
import { UniqueValueError } from '@app/graphql/errors';
import { groupYupErrors } from '@app/graphql/errors/helpers';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

export const createUser: MutationResolvers['createUser'] = async (
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

  const hashedPassword = await bcrypt.hash(input.password, 10);

  try {
    const user = await prisma.user.create({
      data: { email: input.email, password: hashedPassword },
    });

    return {
      ...user,
      token: jwt.sign(user, process.env.JWT_SECRET),
    };
  } catch (e) {
    if (e.code === 'P2002') {
      throw new UniqueValueError('E-Mail');
    }

    throw new ApolloError('Unknown error');
  }
};
