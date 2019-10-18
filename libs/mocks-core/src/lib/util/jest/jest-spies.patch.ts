import { DebugElement } from '@angular/core';
import { Observable } from 'apollo-link';
import { BehaviorSubject, Subject } from 'rxjs';

declare const jest;

/**
 * Object interface.
 */
export interface IObjectWithProperties<T> {
  [key: string]: T | IObjectWithProperties<T>;
}

/**
 * Debug element instance type.
 */
export type DebugElementComponentInstance = DebugElement['componentInstance'];

/**
 * Setup spies function type.
 */
export type SetupJestSpiesFor<T> = (
  component: DebugElementComponentInstance,
) => IObjectWithProperties<T>;

/**
 * Sets up Jest spies for class functions.
 * Scans class for functions, sets up jest spies, and returns an object with class keys and respective spies.
 * Sets spy if component member is:
 * - a function, then function is being spied on;
 * - an observable, then observable's pipe method is being spied on;
 * - a subject or behavior subject, then subject's pipe and subscribe methods are being spied on.
 * @param component debug element component instance
 */
export function setupJestSpiesFor<T>(
  component: DebugElementComponentInstance,
): IObjectWithProperties<T> {
  const spiesObject: IObjectWithProperties<T> = Object.keys(component).reduce(
    (accumulator: any, key: string) => {
      let spy: T | IObjectWithProperties<T> | null = null;
      // Spy on component functions
      if (component[key] instanceof Function) {
        const componentSpy: T = jest.spyOn(component, key);
        spy = componentSpy;
      }
      // Spy on pipe and subscribe methods of observables, subjects, and behavior subjects
      if (
        component[key] instanceof Observable ||
        component[key] instanceof Subject ||
        component[key] instanceof BehaviorSubject
      ) {
        const objectWithProperties: IObjectWithProperties<T> = {
          pipe: jest.spyOn(component[key], 'pipe'),
          subscribe: jest.spyOn(component[key], 'subscribe'),
        };
        spy = objectWithProperties;
      } else {
      }
      accumulator[key] = spy;
      return accumulator;
    },
    {},
  );

  return spiesObject;
}
