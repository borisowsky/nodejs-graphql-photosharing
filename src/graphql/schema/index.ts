import { readFileSync } from 'fs';
import path from 'path';

import { gql } from 'apollo-server';

const schemaPath = path.resolve(__dirname, './schema.graphql');
const schemaBuffer = readFileSync(schemaPath);

export const schema = gql`
  ${schemaBuffer}
`;
