import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { ApiAuthUtilsService } from '../../auth-utils/service/auth-utils.service';
import { ApiAuthService } from '../service/auth.service';
import { ApiAuthController } from './auth.controller';

describe('ApiAuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      controllers: [ApiAuthController],
      providers: [ApiAuthService, ApiAuthUtilsService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "Auth service is online. Public methods: login, logout, signup."', () => {
      const appController = app.get<ApiAuthController>(ApiAuthController);
      expect(appController.ping()).toEqual({
        message: 'Auth service is online. Public methods: login, logout, signup.',
      });
    });
  });
});
