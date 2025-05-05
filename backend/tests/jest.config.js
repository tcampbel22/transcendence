export default {
  testEnvironment: 'node',
  transform: {}, // Disable default Jest transformations for ES modules
  transform: {
    '^.+\\.js$': ['babel-jest', { presets: ['@babel/preset-env'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@error-lib)', // Allow this ESM package to be transformed
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};