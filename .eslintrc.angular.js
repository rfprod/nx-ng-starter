/**
 * Rules reference: https://github.com/angular-eslint/angular-eslint
 */
module.exports = {
  rules: {
    '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
    '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
    '@angular-eslint/no-pipe-impure': 'error',
    '@angular-eslint/contextual-decorator': 'error',
    '@angular-eslint/contextual-lifecycle': 'error',
    '@angular-eslint/no-attribute-decorator': 'off', // keep off, @Attribute is more performant than @Input when static values are used
    '@angular-eslint/use-lifecycle-interface': 'error',
    '@angular-eslint/component-max-inline-declarations': ['error', { animations: 20, styles: 8, template: 5 }],
    '@angular-eslint/use-injectable-provided-in': 'error',
    '@angular-eslint/prefer-on-push-component-change-detection': 'error',
    '@angular-eslint/no-output-native': 'error',
    '@angular-eslint/no-lifecycle-call': 'error',
    '@angular-eslint/no-conflicting-lifecycle': 'error',
    '@angular-eslint/no-forward-ref': 'error',
    '@angular-eslint/no-input-prefix': 'error',
    '@angular-eslint/no-input-rename': 'error',
    '@angular-eslint/no-output-on-prefix': 'error',
    '@angular-eslint/no-output-rename': 'error',
    '@angular-eslint/prefer-output-readonly': 'error',
    '@angular-eslint/relative-url-prefix': 'error',
    '@angular-eslint/use-component-selector': 'error',
    '@angular-eslint/use-component-view-encapsulation': 'error',
    '@angular-eslint/use-pipe-transform-interface': 'error',
    '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component', 'Page', 'Modal'] }],
    '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive', 'ViewAdapter'] }],
    '@angular-eslint/no-host-metadata-property': 'error',
    '@angular-eslint/no-inputs-metadata-property': 'error',
    '@angular-eslint/no-outputs-metadata-property': 'error',
    '@angular-eslint/no-queries-metadata-property': 'error',
  },

  overrides: [
    {
      files: '**/*.spec.ts',
      rules: {
        '@angular-eslint/no-lifecycle-call': 'off',
        '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      },
    },
    {
      files: '**/*.mock.ts',
      rules: {
        '@angular-eslint/use-injectable-provided-in': 'off',
        '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      },
    },
    {
      files: ['**/hammerjs-gesture.config.ts', '**/*.state.ts'],
      rules: {
        '@angular-eslint/use-injectable-provided-in': 'off',
      },
    },
    // NOTE: WE ARE NOT APPLYING PRETTIER IN THIS OVERRIDE, ONLY @ANGULAR-ESLINT/TEMPLATE
    {
      files: ['**/*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
    {
      files: ['**/*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        // NOTE: WE ARE OVERRIDING THE DEFAULT CONFIG TO ALWAYS SET THE PARSER TO ANGULAR (SEE BELOW)
        'prettier/prettier': ['error', { parser: 'angular' }],
      },
    },
  ],
};
