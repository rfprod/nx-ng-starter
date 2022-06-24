// See more here: https://web.dev/trusted-types/#create-a-default-policy

/**
 * This global variable is declared by declaring "node_modules/dompurify/dist/purify.min.js"
 * in angular.json `scripts` array.
 */
var DOMPurify;

/**
 * Creates a default Trusted Types policy.
 * This file is added to client frontend applications via angular.json `scripts` array.
 */
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML: string => DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
    createScript: string => DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
    createScriptURL: string => DOMPurify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
  });
}
