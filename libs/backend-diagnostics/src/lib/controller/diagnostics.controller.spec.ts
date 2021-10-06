import { Test, TestingModule } from '@nestjs/testing';

import { BackendDiagnosticsService } from '../service/diagnostics.service';
import { BackendDiagnosticsController } from './diagnostics.controller';

describe('BackendDiagnosticsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [BackendDiagnosticsController],
      providers: [BackendDiagnosticsService],
    }).compile();
  });

  describe('ping', () => {
    it('should return "Diagnostics service is online. Routes: diagnostics, diagnostics/static."', () => {
      const appController = app.get<BackendDiagnosticsController>(BackendDiagnosticsController);
      expect(appController.ping()).toEqual({
        message: 'Diagnostics service is online. Routes: diagnostics, diagnostics/static.',
      });
    });
  });
});
