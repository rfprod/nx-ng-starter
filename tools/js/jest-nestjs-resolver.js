/**
 * Custom jest resolver for nestjs apps and libs.
 * @param {string} path
 * @param {Object} options
 * @returns Default Jest resolver with filtered packages.
 */
module.exports = (path, options) => {
  return options.defaultResolver(path, {
    ...options,
    /**
     * Package filtering function.
     * Process process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
     * @param {Object} packageJson
     * @param {string} packageJson.name
     * @param {Object} [packageJson.exports]
     * @param {string} [packageJson.module]
     * @returns Filtered `package.json` object.
     */
    packageFilter: packageJson => {
      /**
       * Remove unneeded object properties from `package.json` of the uuid package.
       * Justification: The uuid package fails with jest-environment-jsdom for node projects. The uuid package is used in @nestjs/common and possibly other packages.
       * See:
       * - https://github.com/uuidjs/uuid/pull/616
       * - https://jestjs.io/docs/upgrading-to-jest28#packagejson-exports
       * - https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
       */
      if (packageJson.name === 'uuid') {
        delete packageJson.exports;
        delete packageJson.module;
      }
      return packageJson;
    },
  });
};
