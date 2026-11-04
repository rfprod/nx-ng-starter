const path = require('path');

/**
 * File Replacement Plugin for esbuild
 *
 * Intercepts module resolution to redirect imports to different files.
 * Commonly used for environment-specific configurations or test doubles.
 *
 * @param {Object} replacements - Map of source modules to their replacement paths
 *                                 e.g., { 'src/environment': 'src/environment.prod' }
 * @param {string} projectRoot - Base directory for resolving replacement paths (default: cwd)
 * @returns {Object} esbuild plugin
 */
module.exports = function fileReplacementPlugin(replacements = {}, projectRoot = process.cwd()) {
  return {
    name: 'file-replacement',
    setup(build) {
      console.log('File replacement plugin initialized with:', replacements);

      /**
       * Logging hook: Tracks all resolution attempts for 'environment' modules.
       * Useful for debugging import paths and determining which files are being resolved.
       */
      build.onResolve({ filter: /.*/ }, args => {
        if (args.path.includes('environment')) {
          console.log('Attempting to resolve:', args.path, 'from:', args.importer);
        }
      });

      /**
       * Resolution override: For each configured replacement, intercept the module
       * import and redirect it to the replacement file.
       *
       * - Creates a regex filter for each source module (with optional .ts/.js extension)
       * - Resolves the replacement path relative to projectRoot
       * - Marks as non-external so esbuild bundles the replacement
       */
      Object.entries(replacements).forEach(([from, to]) => {
        build.onResolve({ filter: new RegExp(`${from}(\\.ts|\\.js)?$`) }, args => {
          const absolutePath = path.resolve(projectRoot, to);
          console.log(`✓ Replacing ${args.path} → ${absolutePath}`);
          return { path: absolutePath, external: false };
        });
      });
    },
  };
};
