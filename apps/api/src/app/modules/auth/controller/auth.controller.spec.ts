import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';

import { AuthService } from '../service/auth.service';

import { AuthUtilsService } from '../../auth-utils/service/auth-utils.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, AuthUtilsService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "Auth service is online. Public methods: login, logout, signup."', () => {
      const appController = app.get<AuthController>(AuthController);
      expect(appController.ping()).toEqual({
        message: 'Auth service is online. Public methods: login, logout, signup.',
      });
    });
  });
});
