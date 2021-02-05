/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/**
 * BROWSER POLYFILLS
 */

/**
 * IE9, IE10 and IE11 requires all of the following polyfills.
 */
import 'core-js/es/array';
import 'core-js/es/date';
import 'core-js/es/function';
import 'core-js/es/map';
import 'core-js/es/math';
import 'core-js/es/number';
import 'core-js/es/object';
import 'core-js/es/parse-float';
import 'core-js/es/parse-int';
import 'core-js/es/reflect'; // IE10 and IE11 requires the following for the Reflect API.
import 'core-js/es/regexp';
import 'core-js/es/set';
import 'core-js/es/string';
import 'core-js/es/symbol';
import 'core-js/es/weak-map';
import 'isomorphic-fetch';

/**
 * If the application will be indexed by Google Search, the following is required.
 * Googlebot uses a renderer based on Chrome 41.
 * https://developers.google.com/search/docs/guides/rendering
 *
 * import 'core-js/es6/array';
 */

/**
 * IE10 and IE11 requires the following for NgClass support on SVG elements
 */
// Import 'classlist.js';  // Run `npm install --save classlist.js`.

/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// Run `npm install --save web-animations-js`, then import 'web-animations-js';

/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 */
// Disable patch requestAnimationFrame
// (window as any).__Zone_disable_requestAnimationFrame = true;
// Disable patch onProperty such as onclick
// (window as any).__Zone_disable_on_property = true;
// Disable patch specified eventNames
// (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove'];

/**
 * In IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 * with the following flag, it will bypass `zone.js` patch for IE/Edge
 */
(window as any).__Zone_enable_cross_context_check = true;

/**
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone'; // Included with Angular CLI.
/**
 * Custom Elements v1 aren’t fully supported by the browsers yet, so we need to install a polyfill.
 */
import '@webcomponents/custom-elements';
// Next one is required when compiling elements modules separately
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
