const config = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 77,
      functions: 85,
      lines: 86,
      statements: 84,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
};

export default config;
