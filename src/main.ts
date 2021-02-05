import dotenv from 'dotenv';

import { createServer } from '@app/utils/server';

dotenv.config();

const server = createServer();

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
