module.exports = {
  name: 'proto',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/proto',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
