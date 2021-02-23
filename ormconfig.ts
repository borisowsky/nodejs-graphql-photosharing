export default {
  type: 'sqlite',
  synchronize: true,
  database: process.env.TYPEORM_DATABASE,
  logging: process.env.TYPEORM_LOGGING,
  entities: ['./src/db/entities/**/*.ts'],
  migrations: ['./src/db/migrations/**/*.ts'],
  subscribers: ['./src/db/subscribers/**/*.ts'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
};
