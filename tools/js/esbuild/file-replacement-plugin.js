const path = require('path');

module.exports = function fileReplacementPlugin(replacements = {}, projectRoot = process.cwd()) {
  return {
    name: 'file-replacement',
    setup(build) {
      console.log('File replacement plugin initialized with:', replacements);

      build.onResolve({ filter: /.*/ }, args => {
        if (args.path.includes('environment')) {
          console.log('Attempting to resolve:', args.path, 'from:', args.importer);
        }
      });

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
