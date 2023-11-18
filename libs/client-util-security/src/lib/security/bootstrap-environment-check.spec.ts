import { applicationIsFramed } from './bootstrap-environment-check';

describe('applicationIsFramed', () => {
  it('should be falsy if the app is not iframed', () => {
    expect(applicationIsFramed()).toBeFalsy();
  });

  it('should be falsy if the app is not iframed, and it is the Cypress environment, and the origin is http://localhost:4200', () => {
    expect(applicationIsFramed(window.self, window.top, 'cypress', 'http://localhost:4200')).toBeFalsy();
  });

  it('should be truthy if the app is iframed, and it is not the Cypress environment', () => {
    expect(applicationIsFramed(window.self, null)).toBeTruthy();
  });

  it('should be truthy if the app is iframed, and it is the Cypress environment', () => {
    expect(applicationIsFramed(window.self, null, 'cypress')).toBeTruthy();
  });

  it('should be truthy if the app is iframed, and it is not the Cypress environment, and the origin is not http://localhost:4200', () => {
    expect(applicationIsFramed(window.self, null, 'cypress', 'not http://localhost:4200')).toBeTruthy();
  });

  it('should be truthy if the app is iframed, and it is not the Cypress environment, and the origin is not http://localhost:4200', () => {
    expect(applicationIsFramed(window.self, null, void 0, 'not http://localhost:4200')).toBeTruthy();
  });

  it('should be truthy if the app is iframed, and it is the Cypress environment, and the origin is not http://localhost:4200', () => {
    expect(applicationIsFramed(window.self, null, 'cypress', 'not http://localhost:4200')).toBeTruthy();
  });
});
