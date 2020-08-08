import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { ApiAuthUtilsService } from '../../auth-utils/service/auth-utils.service';
import { ApiAuthService } from './auth.service';

describe('ApiAuthService', () => {
  let service: ApiAuthService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      providers: [ApiAuthService, ApiAuthUtilsService],
    }).compile();

    service = app.get<ApiAuthService>(ApiAuthService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.ping()).toEqual({
        message: 'Auth service is online. Public methods: login, logout, signup.',
      });
    });
  });
});
