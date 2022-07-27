const config = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 89,
      functions: 95,
      lines: 99,
      statements: 99,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
};

export default config;
