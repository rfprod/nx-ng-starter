import { TestBed, async } from '@angular/core/testing';

import { UserService } from './user.service';

import { LocalStorageMock } from '@nx-ng-starter/mocks-core';

import { Subject } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let localStorage: LocalStorageMock;

  beforeEach(async(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new LocalStorageMock(),
      writable: true,
    });
    localStorage = window.localStorage;
    jest.spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        { provide: 'Window', useValue: window },
        {
          provide: UserService,
          useFactory: () => new UserService(),
        },
      ],
    })
      .compileComponents()
      .then(() => {
        service = TestBed.get(UserService) as UserService;
        jest.spyOn(service.isLoggedInSubscription, 'next');
        jest.spyOn(service, 'restoreUser');
      });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('custructor should call restoreUser if item userService exists in localStorage', () => {
    service['restoreUserOnInit']();
    expect(service.restoreUser).toHaveBeenCalled();
  });

  it('local storage mock should work correctly', () => {
    expect(localStorage.getItem('test')).toBeUndefined();
    expect(localStorage['test']).toBeUndefined();

    localStorage.setItem('test', 'some value');
    expect(localStorage.getItem('test')).toEqual('some value');
    expect(localStorage['test']).toEqual('some value');

    localStorage.removeItem('test');
    expect(localStorage.getItem('test')).toBeUndefined();
    expect(localStorage['test']).toBeUndefined();
  });

  it('should have variables and methods defined', () => {
    expect(service['model']).toEqual(
      expect.objectContaining({
        email: '',
        admin: false,
        token: '',
      }),
    );
    expect(service['initializeModel']).toEqual(expect.any(Function));
    expect(service.getUser).toEqual(expect.any(Function));
    expect(service.isLoggedInSubscription).toEqual(expect.any(Subject));
    expect(service.isLoggedIn).toEqual(expect.any(Function));
    expect(service.saveUser).toEqual(expect.any(Function));
    expect(service.restoreUser).toEqual(expect.any(Function));
    expect(service.resetUser).toEqual(expect.any(Function));
  });

  it('initializeModel should initialize a user model', () => {
    expect(service.getUser()).toEqual(
      expect.objectContaining({
        email: '',
        admin: false,
        token: '',
      }),
    );
    service.saveUser({ email: 'ff@ff' });
    expect(service.getUser()).toEqual(
      expect.objectContaining({
        email: 'ff@ff',
        admin: false,
        token: '',
      }),
    );
    service['initializeModel']();
    expect(service.getUser()).toEqual(
      expect.objectContaining({
        email: '',
        admin: false,
        token: '',
      }),
    );
  });

  it('getUser method should return a private model', () => {
    expect(service.getUser()).toEqual(expect.any(Object));
    expect(service.getUser()).toEqual(
      expect.objectContaining({
        email: '',
        admin: false,
        token: '',
      }),
    );
  });

  it('isLoggedIn should return true/false depending on token truthiness in user model', () => {
    expect(service.getUser()).toEqual(
      expect.objectContaining({
        email: '',
        admin: false,
        token: '',
      }),
    );
    expect(service.isLoggedIn()).toBeFalsy();
    service.saveUser({ token: 'tt' });
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('saveUser should update UserService private model, and call isLoggedInSubscription.next() when token is updated', () => {
    expect(service.getUser().email).toEqual('');
    service.saveUser({ email: 'test' });
    expect(service.getUser().email).toEqual('test');
    expect(service.isLoggedInSubscription.next).not.toHaveBeenCalled();

    expect(service.getUser().admin).toBeFalsy();
    service.saveUser({ admin: true });
    expect(service.getUser().admin).toBeTruthy();
    expect(service.isLoggedInSubscription.next).not.toHaveBeenCalled();

    expect(service.getUser().token).toEqual('');
    service.saveUser({ token: 'sample' });
    expect(service.isLoggedInSubscription.next).toHaveBeenCalled();
    expect(service.getUser().token).toEqual('sample');
  });

  it('resetUser should reset private model and local storage, and call isLoggedInSubscription.next()', () => {
    service.resetUser();
    expect(service.getUser()).toEqual(
      expect.objectContaining({
        email: '',
        admin: false,
        token: '',
      }),
    );
    expect(service.isLoggedInSubscription.next).toHaveBeenCalled();
  });

  it('restoreUser should restore user model from local storage if it exists, and call isLoggedInSubscription.next()', () => {
    localStorage.removeItem('userService');
    service.restoreUser();
    expect(service.getUser()).toEqual(
      expect.objectContaining({
        email: '',
        admin: false,
        token: '',
      }),
    );
    localStorage.setItem(
      'userService',
      JSON.stringify({
        email: 'ff@ff',
        admin: true,
        token: 'ff',
      }),
    );
    service.restoreUser();
    expect(service.getUser()).toEqual(
      expect.objectContaining({
        email: 'ff@ff',
        admin: true,
        token: 'ff',
      }),
    );
    expect(service.isLoggedInSubscription.next).toHaveBeenCalled();
  });
});
