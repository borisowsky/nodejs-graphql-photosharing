import { gql } from 'apollo-server';
import faker from 'faker';
import { createTestClient } from 'apollo-server-testing';

import { testingServer } from '@app/utils/testing';

const { mutate } = createTestClient(testingServer);

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
        input: {
          email: faker.internet.email(),
          password: faker.internet.password(10),
        },
      },
    });

    expect(data.createUser.token).toBeTruthy();
  });

  it('Should throw an error with non-valid E-Mail', async () => {
    const { data, errors } = await mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        input: {
          email: 'this-is-not-an-email',
          password: faker.internet.password(10),
        },
      },
    });

    expect(data).toBeNull();
    expect(errors).not.toBeNull();
  });

  it('Should throw an error with too short/empty password', async () => {
    const { data, errors } = await mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        input: {
          email: faker.internet.email(),
          password: faker.internet.password(4),
        },
      },
    });

    expect(data).toBeNull();
    expect(errors).not.toBeNull();
  });
});
