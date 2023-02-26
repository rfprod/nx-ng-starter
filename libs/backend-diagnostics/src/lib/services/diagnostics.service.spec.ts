import { Test, TestingModule } from '@nestjs/testing';
import { ExecException } from 'child_process';
import { firstValueFrom } from 'rxjs';

import { AppDiagnosticsService, CHILD_PROCESS_EXEC } from './diagnostics.service';

describe('AppDiagnosticsService', () => {
  let testingModule: TestingModule;
  let service: AppDiagnosticsService;

  describe('success cases', () => {
    beforeEach(async () => {
      await Test.createTestingModule({
        providers: [
          AppDiagnosticsService,
          {
            provide: CHILD_PROCESS_EXEC,
            useValue: (command: string, callback: (error: ExecException | null, stdout: string, stderr: string) => unknown) =>
              callback(null, 'stdout', 'stderr'),
          },
        ],
      })
        .compile()
        .then(module => {
          testingModule = module;
          service = testingModule.get<AppDiagnosticsService>(AppDiagnosticsService);
        });
    });

    it('should return "Diagnostics service is online. Routes: /, /static."', () => {
      expect(service.ping()).toEqual({
        message: 'Diagnostics service is online. Routes: /, /static.',
      });
    });

    it('static should return static diagnostic data', async () => {
      const staticData = await firstValueFrom(service.static());
      expect(staticData).toEqual(expect.any(Array));
    });

    it('dynamic should return dynamic diagnostic data', () => {
      expect(service.dynamic()).toEqual(expect.any(Array));
    });

    it('npmVersion should return N/A for electron env', async () => {
      process.env.ELECTRON = 'true';
      const staticData = await firstValueFrom(service.static());
      expect(staticData.find(item => item.name === 'NPM Version')?.value).toEqual('N/A');
      delete process.env.ELECTRON;
    });
  });

  test.todo('Debug error case');
  // describe('error case', () => {
  //   beforeEach(async () => {
  //     await Test.createTestingModule({
  //       providers: [
  //         AppDiagnosticsService,
  //         {
  //           provide: CHILD_PROCESS_EXEC,
  //           useValue: (command: string, callback: (error: ExecException | null, stdout: string, stderr: string) => unknown) =>
  //             callback(new Error('error'), 'stdout', 'stderr'),
  //         },
  //       ],
  //     })
  //       .compile()
  //       .then(module => {
  //         testingModule = module;
  //         service = testingModule.get<AppDiagnosticsService>(AppDiagnosticsService);
  //       });
  //   });

  //   it('npmVersion should return N/A if exec error occurs', async () => {
  //     const staticData = await firstValueFrom(service.static());
  //     expect(staticData.find(item => item.name === 'NPM Version')?.value).toEqual('N/A');
  //   });
  // });
});
