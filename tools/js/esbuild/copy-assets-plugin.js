const path = require('path');
const fs = require('node:fs');

/**
 * Recursively copy a directory
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 */
function copyDirRecursive(src, dest) {
  // Remove destination if it exists (to ensure fresh copy)
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }

  fs.mkdirSync(dest, { recursive: true });
  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    const stat = fs.statSync(srcFile);

    if (stat.isDirectory()) {
      copyDirRecursive(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

/**
 * esbuild plugin to copy static assets to the output directory.
 *
 * @param {Array<{src: string, dest?: string}>} assets - Assets to copy
 *   - src: relative path from project root (e.g., 'node_modules/swagger-ui-dist')
 *   - dest: relative path in output directory (defaults to basename of src)
 * @param {string} projectRoot - Project root directory (defaults to process.cwd())
 * @returns {Object} esbuild plugin
 *
 * @example
 * const copyAssetsPlugin = require('../../tools/js/esbuild/copy-assets-plugin');
 *
 * module.exports = {
 *   plugins: [
 *     copyAssetsPlugin([
 *       { src: 'node_modules/swagger-ui-dist' },
 *       { src: 'apps/api/public', dest: 'public' }
 *     ])
 *   ]
 * };
 */
module.exports = function copyAssetsPlugin(assets = [], projectRoot = process.cwd(), outdir = null) {
  return {
    name: 'copy-assets',
    setup(build) {
      const resolvedOutdir = outdir || build.initialOptions.outdir;
      if (!resolvedOutdir) {
        console.warn('⚠️  copyAssetsPlugin: outdir not specified');
        return;
      }

      console.log('Copy assets plugin initialized with:', assets.length, 'asset(s)');

      build.onEnd(() => {
        assets.forEach(({ src, dest }) => {
          const srcPath = path.resolve(projectRoot, src);
          const destName = dest || path.basename(src);
          const destPath = path.resolve(outdir, destName);

          try {
            if (!fs.existsSync(srcPath)) {
              console.warn(`⚠️  Asset source not found: ${srcPath}`);
              return;
            }

            const stat = fs.statSync(srcPath);

            fs.mkdirSync(path.dirname(destPath), { recursive: true });

            if (stat.isDirectory()) {
              copyDirRecursive(srcPath, destPath);
              console.log(`✓ Copied directory: ${src} → ${destName}/`);
            } else {
              fs.copyFileSync(srcPath, destPath);
              console.log(`✓ Copied file: ${src} → ${destName}`);
            }
          } catch (error) {
            console.error(`✗ Failed to copy asset ${src}:`, error.message);
          }
        });
      });
    },
  };
};
