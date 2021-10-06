import { Test } from '@nestjs/testing';

import { BackendDiagnosticsService } from './diagnostics.service';

describe('BackendDiagnosticsService', () => {
  let service: BackendDiagnosticsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [BackendDiagnosticsService],
    }).compile();

    service = app.get<BackendDiagnosticsService>(BackendDiagnosticsService);
  });

  describe('ping', () => {
    it('should return "Diagnostics service is online. Routes: diagnostics, diagnostics/static."', () => {
      expect(service.ping()).toEqual({
        message: 'Diagnostics service is online. Routes: diagnostics, diagnostics/static.',
      });
    });
  });
});
