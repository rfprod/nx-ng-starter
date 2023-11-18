type TExtendedWindow = typeof window & {
  Cypress?: unknown;
};

/**
 * Disallowing a client application to be bootstrapped in an iframe increases application security.
 * Exceptions:
 * - the app is bootstrapped in the integration testing environment (Cypress);
 * - the app origin is http://localhost:4200.
 * This functions should be used in the main.ts files of client application.
 */
export const applicationIsFramed = (
  self = window.self,
  top = window.top,
  cypress = (<TExtendedWindow>window).Cypress,
  origin = window.location.origin,
): boolean => {
  const framed = self !== top;
  const cypressEnv = typeof cypress !== 'undefined';
  const localhost = origin === 'http://localhost:4200';

  return framed && (!cypressEnv || !localhost);
};
