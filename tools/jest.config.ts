const config = {
  coverageDirectory: '../coverage/tools',
  coverageThreshold: {
    global: {
      branches: 81,
      functions: 91,
      lines: 94,
      statements: 94,
    },
  },
  displayName: 'tools',
  preset: '../jest.preset.js',
  globals: {},
};

export default config;
