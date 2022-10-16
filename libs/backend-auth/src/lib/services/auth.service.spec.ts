import { AppMessage, AppUser, AppUserLoginCredentials, AppUserLogoutCredentials } from '@app/backend-interfaces';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { IAuthPayload } from '../interfaces/auth.interface';
import { AppAuthService } from './auth.service';

describe('AppAuthService', () => {
  let testingModule: TestingModule;
  let authService: AppAuthService;
  let jwtService: JwtService;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      providers: [AppAuthService],
    })
      .compile()
      .then(module => {
        testingModule = module;
        authService = testingModule.get<AppAuthService>(AppAuthService);
        jwtService = testingModule.get<JwtService>(JwtService);
      });
  });

  describe('jwt methods', () => {
    let token: string;
    const payload: Omit<IAuthPayload, 'expires'> = {
      email: 'test@email.tld',
      name: 'test',
    };

    it('generateJWToken should generate a token and return it', () => {
      const jwtSignSpy = jest.spyOn(jwtService, 'sign');

      token = authService.generateJWToken(payload);
      expect(typeof token === 'string').toBeTruthy();
      expect(token !== '').toBeTruthy();
      expect(jwtSignSpy).toHaveBeenCalledWith(payload);
    });

    it('decodeJWToken should decode a token and return it', () => {
      const jwtDecodeSpy = jest.spyOn(jwtService, 'decode');
      const decoded = authService.decodeJWToken(token);
      expect(decoded).toMatchObject<IAuthPayload & { iat: number }>({
        ...payload,
        iat: decoded.iat,
      });
      expect(jwtDecodeSpy).toHaveBeenCalledWith(token);
    });
  });

  it('ping should return "Welcome to api!"', () => {
    expect(authService.ping()).toEqual({
      message: 'Auth service is online. Public methods: login, logout, signup.',
    });
  });

  it('login should authenticate and return a user profile', () => {
    const credentials = new AppUserLoginCredentials();
    expect(authService.login(credentials) instanceof AppUser).toBeTruthy();
  });

  it('logout should return a success message', () => {
    const credentials = new AppUserLogoutCredentials();
    expect(authService.logout(credentials)).toEqual(
      new AppMessage({
        message: `success for token ${credentials.token}`,
      }),
    );
  });

  it('signup should authenticate and return a user profile', () => {
    const credentials = new AppUserLoginCredentials();
    expect(authService.signup(credentials) instanceof AppUser).toBeTruthy();
  });
});
