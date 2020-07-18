module.exports = {
  name: 'shared-ui-translate',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/shared-ui-translate',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
