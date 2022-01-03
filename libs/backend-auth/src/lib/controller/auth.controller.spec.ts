import { Message, UserLoginCredentials, UserLogoutCredentials, UserProfile } from '@app/backend-interfaces';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { BackendAuthService } from '../service/auth.service';
import { BackendAuthController } from './auth.controller';

describe('BackendAuthController', () => {
  let testingModule: TestingModule;
  let authController: BackendAuthController;
  let authService: BackendAuthService;
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
      controllers: [BackendAuthController],
      providers: [BackendAuthService],
    })
      .compile()
      .then(module => {
        testingModule = module;
        authController = testingModule.get<BackendAuthController>(BackendAuthController);
        authService = testingModule.get<BackendAuthService>(BackendAuthService);
        authServiceSpy = {
          login: jest.spyOn(authService, 'login').mockImplementation(
            (credentials: UserLoginCredentials) =>
              new UserProfile({
                id: '0',
                name: {
                  first: 'first',
                  last: 'last',
                },
                contacts: {
                  email: credentials.email,
                  phone: 'phone',
                },
                token: authService.generateJWToken({
                  email: credentials.email,
                  name: `first last`,
                }),
              }),
          ),
          logout: jest
            .spyOn(authService, 'logout')
            .mockImplementation((credentials: UserLogoutCredentials) => new Message({ message: `success for token ${credentials.token}` })),
          signup: jest.spyOn(authService, 'signup').mockImplementation(
            (credentials: UserLoginCredentials) =>
              new UserProfile({
                id: '0',
                name: {
                  first: 'first',
                  last: 'last',
                },
                contacts: {
                  email: credentials.email,
                  phone: 'phone',
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
    const credentials = new UserLoginCredentials();
    authController.login(credentials);
    expect(authServiceSpy.login).toHaveBeenCalledWith(credentials);
  });

  it('logout method should call a respective auth service method with credentials', () => {
    const credentials = new UserLogoutCredentials();
    authController.logout(credentials);
    expect(authServiceSpy.logout).toHaveBeenCalledWith(credentials);
  });

  it('signup method should call a respective auth service method with credentials', () => {
    const credentials = new UserLoginCredentials();
    authController.signup(credentials);
    expect(authServiceSpy.signup).toHaveBeenCalledWith(credentials);
  });
});
