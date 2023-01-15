/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ["**/src/**/*.test.[jt]s?(x)"],
  collectCoverage: true,
  setupFiles: ["./src/jestSetup.ts"]
};