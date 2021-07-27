module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'improvement', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
    ],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [2, 'never'],
    'scope-max-length': [2, 'always', 15],
    'header-case': [2, 'always', 'lower-case'],
    'header-min-length': [2, 'always', 10],
    'header-max-length': [2, 'always', 72],
    'body-leading-blank': [2, 'always'],
    'body-min-length': [2, 'always', 30],
    'body-max-length': [2, 'always', 'Infinity'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [2, 'always'],
  },
};
