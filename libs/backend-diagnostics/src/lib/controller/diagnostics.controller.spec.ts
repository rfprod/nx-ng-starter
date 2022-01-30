import { Test, TestingModule } from '@nestjs/testing';
import { exec } from 'child_process';
import { firstValueFrom, of } from 'rxjs';

import { BackendDiagnosticsService, CHILD_PROCESS_EXEC } from '../service/diagnostics.service';
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
      providers: [
        BackendDiagnosticsService,
        {
          provide: CHILD_PROCESS_EXEC,
          useValue: exec,
        },
      ],
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
          static: jest.spyOn(diagService, 'static').mockReturnValue(
            of([
              {
                name: 'Node.js Version',
                value: process.version.replace('v', ''),
              },
            ]),
          ),
        };
      });
  });

  it('ping should return "Diagnostics service is online. Routes: /, /static."', () => {
    expect(diagController.ping()).toEqual({
      message: 'Diagnostics service is online. Routes: /, /static.',
    });
    expect(diagServiceSpy.ping).toHaveBeenCalled();
  });

  it('static should return static diagnostic data', async () => {
    const staticData = await firstValueFrom(diagController.static());
    expect(staticData).toEqual(expect.any(Array));
    expect(diagServiceSpy.static).toHaveBeenCalled();
  });
});
