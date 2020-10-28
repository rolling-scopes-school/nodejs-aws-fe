module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/**/*.(spec|test).ts',
  ],
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/**/index.ts',
    '!<rootDir>/**/*.d.ts',
  ],
};
