'use strict';

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^yargs(/helpers)?$': '<rootDir>/test/common/stub/yargs.ts',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.eslint.json' }],
  },
};
