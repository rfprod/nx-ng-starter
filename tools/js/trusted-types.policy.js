// See more here: https://web.dev/trusted-types/#create-a-default-policy

/**
 * Creates a default Trusted Types policy.
 * This file is added to client frontend applications via angular.json `scripts` array.
 */
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML: string => global.DOMPUrify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
    createScript: string => global.DOMPUrify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
    createScriptURL: string => global.DOMPUrify.sanitize(string, { RETURN_TRUSTED_TYPE: true }),
  });
}
