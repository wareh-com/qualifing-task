const TEST_REGEX = '(/spec/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
  verbose: true,
  testRegex: TEST_REGEX,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/', '<rootDir>/node_modules/'
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  moduleNameMapper: {
    "features/(.*)$": "<rootDir>/features/$1",
    "components/(.*)$": "<rootDir>/components/$1",
    "ui/(.*)$": "<rootDir>/ui/$1",
  },
  setupFiles: [
    "<rootDir>/jest.stubs.js"
  ],
  collectCoverage: false,
  globals: {
    "ts-jest": {
      "tsConfig": "tsconfig.json"
    }
  },
}
