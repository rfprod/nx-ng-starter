import { Observable } from 'rxjs';

export type TClassMemberFunctionSpiesObject<T> = {
  [K in keyof T]: jest.SpyInstance;
};

export type TClassMemberObservableSpiesObject<T> = {
  [K in keyof T]: {
    pipe: jest.SpyInstance;
    subscribe: jest.SpyInstance;
  };
};

/**
 * Sets up Jest spies for a class member functions.
 * @param classInstance a class instance
 */
export function spyOnFunctions<T>(classInstance: T): TClassMemberFunctionSpiesObject<T> {
  const spiesObject = <TClassMemberFunctionSpiesObject<T>>{};
  const classProto = Object.getPrototypeOf(classInstance);
  const keys = Object.getOwnPropertyNames(classProto);

  for (const key of keys) {
    const classMember = classInstance[key];
    if (classMember instanceof Function) {
      spiesObject[key] = jest.spyOn(<Record<string, unknown>>classInstance, <never>key);
    }
  }

  return spiesObject;
}

/**
 * Sets up Jest spies for a class member observables.
 * @param classInstance a class instance
 */
export function spyOnObservables<T>(classInstance: T): TClassMemberObservableSpiesObject<T> {
  const spiesObject = <TClassMemberObservableSpiesObject<T>>{};
  const keys = Object.getOwnPropertyNames(classInstance);

  for (const key of keys) {
    const classMember = classInstance[key];
    if (classMember instanceof Observable) {
      spiesObject[key] = {
        pipe: jest.spyOn(classMember, 'pipe'),
        subscribe: jest.spyOn(classMember, 'subscribe'),
      };
    }
  }

  return spiesObject;
}
