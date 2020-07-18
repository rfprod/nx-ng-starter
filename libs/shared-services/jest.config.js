module.exports = {
  name: 'shared-services',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/shared-services',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
