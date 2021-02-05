import { gql } from 'apollo-server';

import { mutate } from '@app/utils/testing';

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      token
    }
  }
`;

describe('Create user', () => {
  it('Should create user with given email and password', async () => {
    const { data } = await mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        input: { email: 'test@example.com', password: 'password' },
      },
    });

    expect(data.createUser.token).toBeTruthy();
  });

  it('Should throw an error with non-valid E-Mail', async () => {
    const { data, errors } = await mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        input: { email: 'this-is-not-an-email', password: 'password' },
      },
    });

    expect(data).toBeNull();
    expect(errors).not.toBeNull();
  });

  it('Should throw an error with too short/empty password', async () => {
    const { data, errors } = await mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        input: { email: 'test@example.com', password: '' },
      },
    });

    expect(data).toBeNull();
    expect(errors).not.toBeNull();
  });
});
