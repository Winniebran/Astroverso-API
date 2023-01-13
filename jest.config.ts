export default {
  coverageProvider: "v8",
  preset: "ts-jest",
  testMatch: [
    "**/__tests__/integration/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
};
