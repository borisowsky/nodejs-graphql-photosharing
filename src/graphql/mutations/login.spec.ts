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

const LOGIN_USER_MUTATION = gql`
  mutation login($input: LoginUserInput!) {
    login(input: $input) {
      id
      token
    }
  }
`;

describe('Login user', () => {
  it('Should create user and be able to log in with given credentials', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };

    await mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        input: credentials,
      },
    });

    const { data } = await mutate({
      mutation: LOGIN_USER_MUTATION,
      variables: {
        input: credentials,
      },
    });

    expect(data.login.token).toBeTruthy();
  });
});
