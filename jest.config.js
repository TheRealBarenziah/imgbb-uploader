module.exports = {
  preset: "ts-jest",
  transform: {
    ".ts": "ts-jest",
  },
  testRegex: "(/__tests__/.*)$",
  testPathIgnorePatterns: [
    "/src/__tests__/images/imagePath.js",
    "/src/__tests__/utils.js",
    "/src/__tests__/codegen.js",
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/*.ts"],
  setupFiles: ["dotenv/config"],
  testTimeout: 60000,
};
