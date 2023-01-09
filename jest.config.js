/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ["**/tests/**/*.test.[jt]s?(x)"],
  collectCoverage: true
};