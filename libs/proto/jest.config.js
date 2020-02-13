module.exports = {
  name: 'proto',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/proto',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
