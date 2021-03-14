/**
 * when browser's window nodeIntegration equals false
 * this restores node globals
 */

const _setImmediate = setImmediate;
const _clearImmediate = clearImmediate;

process.once('loaded', () => {
  global.setImmediate = _setImmediate;
  global.clearImmediate = _clearImmediate;
});
