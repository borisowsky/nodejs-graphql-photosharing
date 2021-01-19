import { ApolloError } from 'apollo-server';

export class UniqueValueError extends ApolloError {
  constructor(variableName: string) {
    const message = `${variableName} should be unique`;

    super(message);
  }
}
