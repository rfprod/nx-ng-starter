import { Test, TestingModule } from '@nestjs/testing';

import { API_ENV, apiAppEnvProvider, AppApiEnvironment } from './api-environment';

describe('AppApiEnvironment', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppApiEnvironment();
    expect(raw.appName).toEqual('Nx Ng Starter API');
    expect(raw.grpcUrl).toEqual('0.0.0.0:50051');
    expect(raw.firebase).toBeFalsy();
    expect(raw.production).toBeFalsy();

    const initializer: AppApiEnvironment = {
      appName: 'test',
      grpcUrl: 'test',
      firebase: true,
      production: true,
    };
    const initialized = new AppApiEnvironment(initializer);
    expect(initialized.appName).toEqual(initializer.appName);
    expect(initialized.grpcUrl).toEqual(initializer.grpcUrl);
    expect(initialized.firebase).toEqual(initializer.firebase);
    expect(initialized.production).toEqual(initializer.production);
  });
});

describe('apiAppEnvProvider', () => {
  let testingModule: TestingModule;
  let environment: AppApiEnvironment;

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [apiAppEnvProvider],
    })
      .compile()
      .then(module => {
        testingModule = module;
        environment = testingModule.get<AppApiEnvironment>(API_ENV);
      });
  });

  it('should provide as expected', () => {
    const raw = new AppApiEnvironment();
    expect(environment.appName).toEqual(raw.appName);
    expect(environment.grpcUrl).toEqual(raw.grpcUrl);
    expect(environment.firebase).toEqual(raw.firebase);
    expect(environment.production).toEqual(raw.production);
  });
});
