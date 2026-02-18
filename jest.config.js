/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  roots: ["tests"],
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.test.json"
      }
    ]
  }
};
