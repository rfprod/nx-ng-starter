module.exports = {
  env: {
    'cypress/globals': true,
  },
  extends: ['plugin:cypress/recommended'],
  plugins: ['cypress'],
  overrides: [
    {
      files: ['**/src/support/index.ts', '**/src/lib/support/index.ts'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/triple-slash-reference': 'off', // needed for Cypress types import via reference
      },
    },
  ],
};
