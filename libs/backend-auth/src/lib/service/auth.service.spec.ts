import { Message, UserLoginCredentials, UserLogoutCredentials, UserProfile } from '@app/backend-interfaces';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { BackendAuthService, IAuthPayload } from './auth.service';

describe('BackendAuthService', () => {
  let testingModule: TestingModule;
  let authService: BackendAuthService;
  let jwtService: JwtService;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      providers: [BackendAuthService],
    })
      .compile()
      .then(module => {
        testingModule = module;
        authService = testingModule.get<BackendAuthService>(BackendAuthService);
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
    const credentials = new UserLoginCredentials();
    expect(authService.login(credentials) instanceof UserProfile).toBeTruthy();
  });

  it('logout should return a success message', () => {
    const credentials = new UserLogoutCredentials();
    expect(authService.logout(credentials)).toEqual(
      new Message({
        message: `success for token ${credentials.token}`,
      }),
    );
  });

  it('signup should authenticate and return a user profile', () => {
    const credentials = new UserLoginCredentials();
    expect(authService.signup(credentials) instanceof UserProfile).toBeTruthy();
  });
});
