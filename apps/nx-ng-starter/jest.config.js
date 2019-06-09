module.exports = {
  name: 'nx-ng-starter',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nx-ng-starter',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
