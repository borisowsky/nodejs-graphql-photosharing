import * as yup from 'yup';

import { ApolloError } from 'apollo-server';

import { User } from '@app/db/entities';
import { MutationResolvers } from '@app/types/resolvers';
import { UniqueValueError, UnknownError } from '@app/graphql/errors';
import { groupYupErrors } from '@app/graphql/errors/helpers';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
});

export const createUser: MutationResolvers['createUser'] = async (
  _root,
  { input },
) => {
  try {
    await schema.validate(input, { abortEarly: false });
  } catch (e) {
    const errors = groupYupErrors(e);

    throw new ApolloError(e.message, null, { errors });
  }

  try {
    const user = new User();

    user.setEmail(input.email);
    user.setPassword(input.password);

    const savedUser = await user.save();

    return await User.authenticate(savedUser.email, input.password);
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT') {
      throw new UniqueValueError('E-Mail');
    }

    throw new UnknownError(e.message);
  }
};
