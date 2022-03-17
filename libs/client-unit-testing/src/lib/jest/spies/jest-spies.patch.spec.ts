import { waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, tap } from 'rxjs';

import { spyOnFunctions, spyOnObservables, TClassMemberFunctionSpiesObject, TClassMemberObservableSpiesObject } from './jest-spies.patch';

class AppJestSpiesTestInstance {
  private readonly testSubject = new BehaviorSubject<boolean>(false);

  public test$ = this.testSubject.asObservable();

  public testFnOne() {
    return true;
  }

  public testFnTwo() {
    return true;
  }
}

describe('spyOnFunctions', () => {
  let mock: AppJestSpiesTestInstance;
  let fnSpy: TClassMemberFunctionSpiesObject<AppJestSpiesTestInstance>;

  beforeEach(() => {
    mock = new AppJestSpiesTestInstance();
    fnSpy = spyOnFunctions<AppJestSpiesTestInstance>(mock);
  });

  it('should be defined', () => {
    expect(fnSpy).toBeDefined();
  });

  it('should set up function spies', () => {
    expect(fnSpy.testFnOne).toHaveBeenCalledTimes(0);
    expect(fnSpy.testFnTwo).toHaveBeenCalledTimes(0);
    mock.testFnOne();
    expect(fnSpy.testFnOne).toHaveBeenCalledTimes(1);
    mock.testFnTwo();
    expect(fnSpy.testFnTwo).toHaveBeenCalledTimes(1);
    expect(fnSpy.test$).toBeUndefined();
  });

  it('spies should work as expected', () => {
    mock.testFnOne();
    expect(fnSpy.testFnOne).toHaveBeenCalled();
    mock.testFnTwo();
    expect(fnSpy.testFnTwo).toHaveBeenCalled();
  });
});

describe('spyOnObservables', () => {
  let mock: AppJestSpiesTestInstance;
  let observableSpy: TClassMemberObservableSpiesObject<AppJestSpiesTestInstance>;

  beforeEach(() => {
    mock = new AppJestSpiesTestInstance();
    observableSpy = spyOnObservables<AppJestSpiesTestInstance>(mock);
  });

  it('should be defined', () => {
    expect(observableSpy).toBeDefined();
  });

  it('should set up observable spies', () => {
    expect(observableSpy.testFnOne).toBeUndefined();
    expect(observableSpy.testFnTwo).toBeUndefined();
    expect(observableSpy.test$.pipe).toBeDefined();
    expect(observableSpy.test$.subscribe).toBeDefined();
  });

  it('spies should work as expected', waitForAsync(() => {
    void mock.test$
      .pipe(
        tap(() => {
          expect(observableSpy.test$.pipe).toHaveBeenCalled();
          expect(observableSpy.test$.subscribe).toHaveBeenCalled();
        }),
      )
      .subscribe();
  }));
});
