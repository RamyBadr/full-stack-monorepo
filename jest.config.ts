module.exports = {
  displayName: "backend-api",
  preset: "../../jest.preset.js",
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$"
    }
  },
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js", "html"],
  coverageDirectory: "../../coverage/apps/backend-api"
};

