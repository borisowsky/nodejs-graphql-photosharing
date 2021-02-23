import { ApolloError } from 'apollo-server';

export class UnknownError extends ApolloError {
  constructor(message: string) {
    super(process.env.NODE_ENV === 'production' ? 'Unknown error' : message);
  }
}
