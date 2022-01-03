import { Test, TestingModule } from '@nestjs/testing';

import { BackendDiagnosticsService } from '../service/diagnostics.service';
import { BackendDiagnosticsController } from './diagnostics.controller';

describe('BackendDiagnosticsController', () => {
  let testingModule: TestingModule;
  let diagController: BackendDiagnosticsController;
  let diagService: BackendDiagnosticsService;
  let diagServiceSpy: {
    ping: jest.SpyInstance;
    static: jest.SpyInstance;
  };

  beforeAll(async () => {
    await Test.createTestingModule({
      controllers: [BackendDiagnosticsController],
      providers: [BackendDiagnosticsService],
    })
      .compile()
      .then(module => {
        testingModule = module;
        diagController = testingModule.get<BackendDiagnosticsController>(BackendDiagnosticsController);
        diagService = testingModule.get<BackendDiagnosticsService>(BackendDiagnosticsService);
        diagServiceSpy = {
          ping: jest.spyOn(diagService, 'ping').mockReturnValue({
            message: 'Diagnostics service is online. Routes: /, /static.',
          }),
          static: jest.spyOn(diagService, 'static').mockReturnValue([
            {
              name: 'Node.js Version',
              value: process.version.replace('v', ''),
            },
          ]),
        };
      });
  });

  it('ping should return "Diagnostics service is online. Routes: /, /static."', () => {
    expect(diagController.ping()).toEqual({
      message: 'Diagnostics service is online. Routes: /, /static.',
    });
    expect(diagServiceSpy.ping).toHaveBeenCalled();
  });

  it('static should return static diagnostic data', () => {
    expect(diagController.static()).toEqual(expect.any(Array));
    expect(diagServiceSpy.static).toHaveBeenCalled();
  });
});
