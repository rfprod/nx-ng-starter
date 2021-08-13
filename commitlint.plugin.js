/**
 * Custom plugins documentation reference: https://commitlint.js.org/#/reference-plugins?id=working-with-plugins
 */
module.exports = {
  rules: {
    'scope-pattern-rule': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'scope-pattern-rule': parsed => {
          const scopeRegExp = /^(server|client|linter|unit|e2e|ui|docker|tools|ide|tsconfig|github|workspace|deps|[a-z]{2,})$/;
          return [
            scopeRegExp.test(parsed.scope),
            `A scope MUST consist of a noun describing a section of the codebase ${scopeRegExp}: server, client, linter, unit, e2e, ui, docker, tools, ide, tsconfig, github, workspace, deps etc. 3+ letters`,
          ];
        },
      },
    },
  ],
};
