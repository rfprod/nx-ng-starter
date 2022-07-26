const config = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 54,
      functions: 27,
      lines: 48,
      statements: 49,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
};

export default config;
