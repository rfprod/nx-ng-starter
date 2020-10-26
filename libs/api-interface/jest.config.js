module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/api-interface',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'api-interface',
};
