import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';

import { BackendAuthService } from './auth.service';

describe('BackendAuthService', () => {
  let service: BackendAuthService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'jwtsecret',
        }),
      ],
      providers: [BackendAuthService],
    }).compile();

    service = app.get<BackendAuthService>(BackendAuthService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.ping()).toEqual({
        message: 'Auth service is online. Public methods: login, logout, signup.',
      });
    });
  });
});
