import type { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: ['**/*.{ts}', '!**/node_modules/**', '!**/vendor/**'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  verbose: true,
};

export default config;
