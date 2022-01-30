import { Test, TestingModule } from '@nestjs/testing';
import { exec, ExecException } from 'child_process';
import { firstValueFrom } from 'rxjs';

import { BackendDiagnosticsService, CHILD_PROCESS_EXEC } from './diagnostics.service';

describe('BackendDiagnosticsService', () => {
  let testingModule: TestingModule;
  let diagService: BackendDiagnosticsService;

  describe('success cases', () => {
    beforeAll(async () => {
      await Test.createTestingModule({
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
          diagService = testingModule.get<BackendDiagnosticsService>(BackendDiagnosticsService);
        });
    });

    it('should return "Diagnostics service is online. Routes: /, /static."', () => {
      expect(diagService.ping()).toEqual({
        message: 'Diagnostics service is online. Routes: /, /static.',
      });
    });

    it('static should return static diagnostic data', async () => {
      const staticData = await firstValueFrom(diagService.static());
      expect(staticData).toEqual(expect.any(Array));
    });

    it('dynamic should return dynamic diagnostic data', () => {
      expect(diagService.dynamic()).toEqual(expect.any(Array));
    });

    it('npmVersion should return N/A for electron env', async () => {
      process.env.ELECTRON = 'true';
      const staticData = await firstValueFrom(diagService.static());
      expect(staticData.find(item => item.name === 'NPM Version')?.value).toEqual('N/A');
      delete process.env.ELECTRON;
    });
  });

  describe('error case', () => {
    const execMockImplementation = ((command: string, callback: (error: ExecException | null, stdout: string, stderr: string) => void) => {
      if (typeof callback !== 'undefined') {
        callback(new Error(''), '', 'error');
      }
    }) as unknown as typeof exec;

    beforeAll(async () => {
      await Test.createTestingModule({
        providers: [
          BackendDiagnosticsService,
          {
            provide: CHILD_PROCESS_EXEC,
            useValue: execMockImplementation,
          },
        ],
      })
        .compile()
        .then(module => {
          testingModule = module;
          diagService = testingModule.get<BackendDiagnosticsService>(BackendDiagnosticsService);
        });
    });

    it('npmVersion should return N/A if exec error occurs', async () => {
      const staticData = await firstValueFrom(diagService.static());
      expect(staticData.find(item => item.name === 'NPM Version')?.value).toEqual('N/A');
    });
  });
});
