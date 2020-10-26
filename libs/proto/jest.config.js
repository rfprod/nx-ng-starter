module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/proto',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'proto',
};
