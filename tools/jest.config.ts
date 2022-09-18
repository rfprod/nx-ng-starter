const config = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 73,
      functions: 76,
      lines: 81,
      statements: 79,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
  globals: {},
};

export default config;
