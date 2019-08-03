module.exports = {
  name: 'shared-core',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/shared-core',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
