module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/proto',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
  displayName: 'proto',
};
