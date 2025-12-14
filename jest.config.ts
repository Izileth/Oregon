export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }]
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transform-stub'
  },
  setupFilesAfterEnv: ['./src/setupTests.ts']
};
