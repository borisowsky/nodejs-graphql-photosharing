// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  moduleNameMapper: {
    '^@app/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
