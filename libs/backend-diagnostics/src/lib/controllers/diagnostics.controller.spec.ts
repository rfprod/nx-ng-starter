import { Test, TestingModule } from '@nestjs/testing';
import { firstValueFrom, of } from 'rxjs';

import { diagnosticsModuleProviders } from '../diagnostics.module';
import { AppDiagnosticsService } from '../services/diagnostics.service';
import { AppDiagnosticsController } from './diagnostics.controller';

describe('AppDiagnosticsController', () => {
  let testingModule: TestingModule;
  let diagController: AppDiagnosticsController;
  let diagService: AppDiagnosticsService;
  let diagServiceSpy: {
    ping: jest.SpyInstance;
    static: jest.SpyInstance;
  };

  beforeAll(async () => {
    await Test.createTestingModule({
      controllers: [AppDiagnosticsController],
      providers: [...diagnosticsModuleProviders],
    })
      .compile()
      .then(module => {
        testingModule = module;
        diagController = testingModule.get<AppDiagnosticsController>(AppDiagnosticsController);
        diagService = testingModule.get<AppDiagnosticsService>(AppDiagnosticsService);
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
