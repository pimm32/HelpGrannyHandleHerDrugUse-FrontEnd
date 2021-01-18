/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {

  verbose: true,
  roots: ["<rootDir>/src/", "<rootDir>/src/Tests/"],
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    "^.+\.js$": "babel-jest",
    "^.+\.vue$": "vue-jest",
  },
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],

  clearMocks: true,


  coverageDirectory: "coverage",

  testEnvironment: "jsdom",
  collectCoverage: true,
  testResultsProcessor: "jest-sonar-reporter",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/test/"]
};
