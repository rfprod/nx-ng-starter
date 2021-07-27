module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/proto',
  displayName: 'proto',
  coverageThreshold: {
    // TODO: bump unit test coverage and remove this override
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
