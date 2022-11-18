module.exports = {
  preset: "@vue/cli-plugin-unit-jest",

  testEnvironment: "jsdom",

  testMatch: ["**/__test__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],

  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    src: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageDirectory: "./tests/unit/reports/coverage",

  setupFilesAfterEnv: ["./tests/unit/jest.setup.js"],

  restoreMocks: true,
};
