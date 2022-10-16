import { AppMessage, AppUser, AppUserLoginCredentials, AppUserLogoutCredentials } from '@app/backend-interfaces';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { authModuleProviders } from '../backend-auth.module';
import { AppAuthService } from '../services/auth.service';
import { AppAuthController } from './auth.controller';

describe('AppAuthController', () => {
  let testingModule: TestingModule;
  let authController: AppAuthController;
  let authService: AppAuthService;
  let authServiceSpy: {
    login: jest.SpyInstance;
    logout: jest.SpyInstance;
    signup: jest.SpyInstance;
  };

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      controllers: [AppAuthController],
      providers: [...authModuleProviders],
    })
      .compile()
      .then(module => {
        testingModule = module;
        authController = testingModule.get<AppAuthController>(AppAuthController);
        authService = testingModule.get<AppAuthService>(AppAuthService);
        authServiceSpy = {
          login: jest.spyOn(authService, 'login').mockImplementation(
            (credentials: AppUserLoginCredentials) =>
              new AppUser({
                id: '0',
                name: {
                  first: 'first',
                  last: 'last',
                },
                token: authService.generateJWToken({
                  email: credentials.email,
                  name: `first last`,
                }),
              }),
          ),
          logout: jest
            .spyOn(authService, 'logout')
            .mockImplementation(
              (credentials: AppUserLogoutCredentials) => new AppMessage({ message: `success for token ${credentials.token}` }),
            ),
          signup: jest.spyOn(authService, 'signup').mockImplementation(
            (credentials: AppUserLoginCredentials) =>
              new AppUser({
                id: '0',
                name: {
                  first: 'first',
                  last: 'last',
                },
                token: authService.generateJWToken({
                  email: credentials.email,
                  name: `first last`,
                }),
              }),
          ),
        };
      });
  });

  it('ping method should return "Auth service is online. Public methods: login, logout, signup."', () => {
    expect(authController.ping()).toEqual({
      message: 'Auth service is online. Public methods: login, logout, signup.',
    });
  });

  it('login method should call a respective auth service method with credentials', () => {
    const credentials = new AppUserLoginCredentials();
    authController.login(credentials);
    expect(authServiceSpy.login).toHaveBeenCalledWith(credentials);
  });

  it('logout method should call a respective auth service method with credentials', () => {
    const credentials = new AppUserLogoutCredentials();
    authController.logout(credentials);
    expect(authServiceSpy.logout).toHaveBeenCalledWith(credentials);
  });

  it('signup method should call a respective auth service method with credentials', () => {
    const credentials = new AppUserLoginCredentials();
    authController.signup(credentials);
    expect(authServiceSpy.signup).toHaveBeenCalledWith(credentials);
  });
});
