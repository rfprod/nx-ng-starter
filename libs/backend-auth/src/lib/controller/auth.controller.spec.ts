import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { BackendAuthService } from '../service/auth.service';
import { BackendAuthController } from './auth.controller';

describe('BackendAuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      controllers: [BackendAuthController],
      providers: [BackendAuthService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "Auth service is online. Public methods: login, logout, signup."', () => {
      const appController = app.get<BackendAuthController>(BackendAuthController);
      expect(appController.ping()).toEqual({
        message: 'Auth service is online. Public methods: login, logout, signup.',
      });
    });
  });
});
