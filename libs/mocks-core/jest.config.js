module.exports = {
  name: 'mocks-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/mocks-core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
