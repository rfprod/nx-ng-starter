import { Test, TestingModule } from '@nestjs/testing';

import { BackendDiagnosticsService } from './diagnostics.service';

describe('BackendDiagnosticsService', () => {
  let testingModule: TestingModule;
  let diagService: BackendDiagnosticsService;

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [BackendDiagnosticsService],
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

  it('static should return static diagnostic data', () => {
    expect(diagService.static()).toEqual(expect.any(Array));
  });

  it('dynamic should return dynamic diagnostic data', () => {
    expect(diagService.dynamic()).toEqual(expect.any(Array));
  });

  it('npmVersion should return N/A for electron env', () => {
    process.env.ELECTRON = 'true';
    expect(diagService.static().find(item => item.name === 'NPM Version')?.value).toEqual('N/A');
    delete process.env.ELECTRON;
  });
});
