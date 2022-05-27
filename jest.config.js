/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  transform: {},
  testEnvironment: "node",
  testRegex: "(/__tests__/.*)$",
  testPathIgnorePatterns: [
    "/src/__tests__/images/imagePath.js",
    "/src/__tests__/utils.js",
    "/src/__tests__/codegen.js",
  ],
  moduleFileExtensions: ["js", "mjs"],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/*.ts"],
  setupFiles: ["dotenv/config"],
  testTimeout: 60000,
};
