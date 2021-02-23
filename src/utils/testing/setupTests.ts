import path from 'path';
import dotenv from 'dotenv';

import { createConnection, getConnection } from 'typeorm';

dotenv.config({ path: path.join(__dirname, '../../../.env.test') });

beforeEach(async () => {
  await createConnection();
});

afterEach(async () => {
  const connection = getConnection();

  await connection.close();
});
