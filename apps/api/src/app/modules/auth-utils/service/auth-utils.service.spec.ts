import { Test } from '@nestjs/testing';

import { AuthUtilsService } from './auth-utils.service';

describe('AuthUtilsService', () => {
  let service: AuthUtilsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthUtilsService],
    }).compile();

    service = app.get<AuthUtilsService>(AuthUtilsService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
