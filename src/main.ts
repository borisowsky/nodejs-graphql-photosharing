import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import { createServer } from '@app/utils/server';

dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});

const main = async () => {
  try {
    await createConnection();
  } catch (e) {
    console.error('Problem with database connection:', e.message);
  }

  try {
    const server = createServer();
    const { url } = await server.listen();

    console.log(`🚀 Server ready at ${url}`);
  } catch (e) {
    console.error('Problem with running server:', e.message);
  }
};

main();
