module.exports = {
  name: 'shared-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/shared-core',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
