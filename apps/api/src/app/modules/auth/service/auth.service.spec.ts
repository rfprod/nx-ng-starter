import { Test } from '@nestjs/testing';

import { AuthUtilsService } from '../../auth-utils/service/auth-utils.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthService, AuthUtilsService],
    }).compile();

    service = app.get<AuthService>(AuthService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.ping()).toEqual({
        message: 'Auth service is online. Public methods: login, logout, signup.',
      });
    });
  });
});
